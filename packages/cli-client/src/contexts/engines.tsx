import { useReduxActions } from "@/hooks/redux";
import { useTaskActions } from "@/hooks/tasks";
import { CellLanguage } from "@/lib/constants";
import type { PythonEngine, REngine, SqlEngine } from "@tridata/core";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { TaskType } from "./tasks";
import { sleep } from "@/lib/utils";
import { useReduxSelector } from "@/redux/store";

type ActionsType =
	| { type: CellLanguage.R; payload: REngine }
	| { type: CellLanguage.PYTHON; payload: PythonEngine }
	| { type: CellLanguage.SQL; payload: SqlEngine };
type SetEnginePayload =
	| { lang: CellLanguage.R }
	| { lang: CellLanguage.PYTHON }
	| { lang: CellLanguage.SQL };

type SetEngineContextType = {
	setEngine: (payload: SetEnginePayload) => void;
	setEngineDispatch: React.Dispatch<ActionsType>;
};

type EnginesContextType = {
	R: REngine | null;
	PYTHON: PythonEngine | null;
	SQL: SqlEngine | null;
};

export const EnginesContext = createContext<EnginesContextType>(
	{} as EnginesContextType,
);

export const SetEngineContext = createContext<SetEngineContextType>(
	{} as SetEngineContextType,
);

export default function EnginesContextProvider({
	children,
}: { children: React.ReactNode }) {
	const { setPrompt } = useReduxActions();
	const [engines, setEngineDispatch] = useImmerReducer<
		EnginesContextType,
		ActionsType
	>(
		(draft, action) => {
			switch (action.type) {
				case CellLanguage.R:
					draft.R = action.payload;
					break;
				case CellLanguage.PYTHON:
					draft.PYTHON = action.payload;
					break;
				case CellLanguage.SQL:
					draft.SQL = action.payload;
					break;
			}
		},
		{
			R: null,
			PYTHON: null,
			SQL: null,
		},
	);

	const { packages: rPackages } = useReduxSelector((state) => state.settings.R);

	const { addTask, removeTask } = useTaskActions();

	const setEngine = async (payload: SetEnginePayload) => {
		switch (payload.lang) {
			case CellLanguage.R:
				const { initREngine } = await import("@tridata/core/r");
				const rInitTaskId = addTask({ type: TaskType.R_INIT, timerStart: 0 });
				const { webR, prompt } = await initREngine();
				removeTask(rInitTaskId);
				setPrompt({ lang: CellLanguage.R, prompt: prompt.trim() });
				setEngineDispatch({ type: CellLanguage.R, payload: webR });
				const installRPackagesTaskId = addTask({
					type: TaskType.R_INSTALL,
					message: JSON.stringify(rPackages),
				});
				await webR.evalRVoid("options(crayon.enabled = FALSE)");
				await webR.installPackages(rPackages);
				removeTask(installRPackagesTaskId);
				break;
			case CellLanguage.SQL:
				const { initDuckDbEngine } = await import("@tridata/core/sql");
				const sqlInitTaskId = addTask({
					type: TaskType.SQL_INIT,
					timerStart: 0,
				});
				const engine = await initDuckDbEngine();
				if (!engine) {
					return;
				}
				setEngineDispatch({
					type: CellLanguage.SQL,
					payload: engine as SqlEngine,
				});
				removeTask(sqlInitTaskId);
				break;
		}
	};

	return (
		<SetEngineContext.Provider value={{ setEngine, setEngineDispatch }}>
			<EnginesContext.Provider value={engines}>
				{children}
			</EnginesContext.Provider>
		</SetEngineContext.Provider>
	);
}
