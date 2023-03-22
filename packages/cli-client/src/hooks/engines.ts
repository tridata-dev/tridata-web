import { EnginesContext, SetEngineContext } from "@/contexts/engines";
import { PythonContext } from "@/contexts/python";
import { CellLanguage } from "@/lib/constants";
import { useContext } from "react";

export const useEngine = ({ lang }: { lang: CellLanguage }) => {
	const engines = useContext(EnginesContext);
	let engine = engines[lang];
	const { pythonEngine } = useContext(PythonContext);
	if (lang === CellLanguage.PYTHON) {
		engine = pythonEngine;
	}
	return engine;
};

export const useSetEngine = () => {
	const setEngine = useContext(SetEngineContext);
	return setEngine;
};
