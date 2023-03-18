import RDplyrCode from "@/assets/r/dplyr.R?raw";
import RPlotCode from "@/assets/r/plot.R?raw";
import RSummaryCode from "@/assets/r/summary.R?raw";
import SQLCreateTableCode from "@/assets/sql/create_table.sql?raw";
import { generateId } from "./utils";
import { Cell } from "@/types/store";
import { CellLanguage } from "./constants";

export const getInitialCells = () => {
	const cells: Record<string, Cell> = {};
	const orders = Array.from({ length: 4 }, () => generateId());

	[RPlotCode, RSummaryCode, RDplyrCode, SQLCreateTableCode].forEach(
		(code, i) => {
			cells[orders[i]] = {
				code,
				lang: i === 3 ? CellLanguage.SQL : CellLanguage.R,
				results: [],
				pending: false,
				success: undefined,
				error: undefined,
			};
		},
	);

	return { cells, orders };
};
