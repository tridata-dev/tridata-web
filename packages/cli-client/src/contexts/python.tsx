import { useReduxActions } from "@/hooks/redux";
import { useTaskActions } from "@/hooks/tasks";
import { CellLanguage } from "@/lib/constants";
import { PythonWorker } from "@/workers/python-worker";
import { Remote, wrap } from "comlink";
import { createContext, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { TaskType } from "./tasks";
import { useReduxSelector } from "@/redux/store";
import { PythonEngine } from "@tridata/core";

type PythonContextType = {
	initPythonEngine: () => Promise<void>;
	pythonEngine: PythonEngine | null;
};

export const PythonContext = createContext<PythonContextType>(
	{} as PythonContextType,
);

export default function PythonProvider({
	children,
}: { children: React.ReactNode }) {
	const [pending, setPending] = useState(false);
	const { addTask, removeTask } = useTaskActions();
	const { setPrompt } = useReduxActions();
	const { packages: pythonPackages } = useReduxSelector(
		(state) => state.settings.PYTHON,
	);
	const pythonWorker = useRef<Remote<PythonWorker> | null>(null);
	const pythonEngine = useRef<PythonEngine | null>(null);

	const runPython = useCallback(async (code: string) => {
		if (pythonWorker.current === null) {
			toast(
				"The `Python` engine is not initialized or has lost connection. Please load the engine again.`",
			);
		} else {
			const result = await pythonWorker.current.run(code);
			return result;
		}
	}, []);

	const initPythonEngine = useCallback(async () => {
		if (pythonWorker.current === null && !pending) {
			const pythonInitTaskId = addTask({ type: TaskType.PYTHON_INIT });
			setPending(true);
			const worker = new Worker(
				new URL("../workers/python-worker", import.meta.url),
				{
					type: "module",
				},
			);
			const workerWrapped = wrap<PythonWorker>(worker);
			const banner = await workerWrapped.init();
			removeTask(pythonInitTaskId);
			setPrompt({ lang: CellLanguage.PYTHON, prompt: banner });
			pythonWorker.current = workerWrapped;

			const installPythonPackagesTaskId = addTask({
				type: TaskType.PYTHON_INSTALL,
				message: JSON.stringify(pythonPackages),
			});
			await workerWrapped.installPackages(pythonPackages);
			removeTask(installPythonPackagesTaskId);
			setPending(false);
			pythonEngine.current = {
				runPython,
			};
			return banner;
		}
	}, []);

	return (
		<PythonContext.Provider
			value={{ initPythonEngine, pythonEngine: pythonEngine.current }}
		>
			{children}
		</PythonContext.Provider>
	);
}
