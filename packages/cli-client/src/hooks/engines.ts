import { EnginesContext, EngineContext } from "@/contexts/engines";
import { PythonContext } from "@/contexts/python";
import { TaskType } from "@/contexts/tasks";
import { CellLanguage } from "@/lib/constants";
import { useContext } from "react";
import { useTaskActions } from "./tasks";

export const useEngine = ({ lang }: { lang: CellLanguage }) => {
	const initEngine = useInitEngine();
	const { initPythonEngine } = useContext(PythonContext);
	const engines = useContext(EnginesContext);
	const { hasTask } = useTaskActions();
	const { pythonEngine } = useContext(PythonContext);

	let engine;
	let initTaskType;
	let initEngineFunc: Function;
	if (lang === CellLanguage.PYTHON) {
		engine = pythonEngine;
		initTaskType = TaskType.PYTHON_INIT;
		initEngineFunc = initPythonEngine;
	} else if (lang === CellLanguage.SQL) {
		engine = engines[lang];
		initTaskType = TaskType.SQL_INIT;
		initEngineFunc = () => initEngine({ lang });
	} else {
		engine = engines[lang];
		initTaskType = TaskType.R_INIT;
		initEngineFunc = () => initEngine({ lang });
	}

	const pending = hasTask(initTaskType);

	return { engine, pending, initEngineFunc };
};

export const useInitEngine = () => {
	const { initEngine } = useContext(EngineContext);
	return initEngine;
};
