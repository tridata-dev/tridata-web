import { EnginesContext, SetEngineContext } from "@/contexts/engines";
import { CellLanguage } from "@/lib/constants";
import { useContext } from "react";

export const useEngine = ({ lang }: { lang: CellLanguage }) => {
	const engines = useContext(EnginesContext);
	return engines[lang];
};

export const useSetEngine = () => {
	const setEngine = useContext(SetEngineContext);
	return setEngine;
};
