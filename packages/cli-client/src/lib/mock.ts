import RDplyrCode from "@/assets/r/dplyr.R?raw";
import RPlotCode from "@/assets/r/plot.R?raw";
import RSummaryCode from "@/assets/r/summary.R?raw";
import { generateId } from "./utils";
import { Cell } from "@/types/store";
import { SupportedLanguage } from "./constants";

export const getInitialCells = () => {
	const cells = new Map<string, Cell>();
	const orders = Array.from({ length: 3 }, () => generateId());

	[RPlotCode, RSummaryCode, RDplyrCode].forEach((code, i) => {
		cells.set(orders[i], {
			lang: SupportedLanguage.R,
			code,
			results: [],
			pending: false,
			success: undefined,
			error: undefined,
		});
	});

	return { cells, orders };
};
