import { useReduxActions } from "@/hooks/redux";
import { CellLanguage } from "@/lib/constants";
import type { PythonEngine, REngine, SqlEngine } from "@tridata/core";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";

type ActionsType =
	| { type: CellLanguage.R; payload: REngine }
	| { type: CellLanguage.PYTHON; payload: PythonEngine }
	| { type: CellLanguage.SQL; payload: SqlEngine };
type SetEnginePayload =
	| { lang: CellLanguage.R }
	| { lang: CellLanguage.PYTHON }
	| { lang: CellLanguage.SQL };

type SetEngineContextType = (payload: SetEnginePayload) => void;

type EnginesContextType = {
	R: REngine | null;
	PYTHON: PythonEngine | null;
	SQL: SqlEngine | null;
};

export const EnginesContext = createContext<EnginesContextType>(
	{} as EnginesContextType,
);

export const SetEngineContext = createContext<SetEngineContextType>(
	() => undefined,
);

export default function EnginesContextProvider({
	children,
}: { children: React.ReactNode }) {
	const { setPrompt } = useReduxActions();
	const [engines, dispatch] = useImmerReducer<EnginesContextType, ActionsType>(
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

	const setEngine = async (payload: SetEnginePayload) => {
		switch (payload.lang) {
			case CellLanguage.R:
				const { initREngine } = await import("@tridata/core/r");
				const { webR, prompt } = await initREngine();
				setPrompt({ lang: CellLanguage.R, prompt: prompt.trim() });
				dispatch({ type: CellLanguage.R, payload: webR });
				break;
			case CellLanguage.PYTHON:
				const { initPythonEngine } = await import("@tridata/core/python");
				const pyodide = await initPythonEngine();
				dispatch({
					type: CellLanguage.PYTHON,
					payload: pyodide as PythonEngine,
				});
				break;
			case CellLanguage.SQL:
				const { initDuckDbEngine } = await import("@tridata/core/sql");
				const engine = await initDuckDbEngine();
				if (!engine) {
					return;
				}
				dispatch({
					type: CellLanguage.SQL,
					payload: engine as SqlEngine,
				});
				break;
		}
	};

	return (
		<SetEngineContext.Provider value={setEngine}>
			<EnginesContext.Provider value={engines}>
				{children}
			</EnginesContext.Provider>
		</SetEngineContext.Provider>
	);
}
