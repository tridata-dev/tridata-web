import RDplyrCode from "@/assets/r/dplyr.R?raw";
import RPlotCode from "@/assets/r/plot.R?raw";
import RSummaryCode from "@/assets/r/summary.R?raw";
import PythonFunctionCode from "@/assets/python/function.py?raw";
import PythonPandasCode from "@/assets/python/pandas.py?raw";
import PythonPlotCode from "@/assets/python/plot.py?raw";
import SQLQueryCSVCode from "@/assets/sql/query_csv.sql?raw";
import SQLQueryParquetCode from "@/assets/sql/query_parquet.sql?raw";
import SQLCreateTableCode from "@/assets/sql/create_table.sql?raw";
import { generateId } from "./utils";
import { CellLanguage } from "./constants";
import { Cell } from "@/types";

export const getInitialCells = () => {
	const cells: Record<string, Cell> = {};
	const orders = Array.from({ length: 1 }, () => generateId());

	[
		RPlotCode,
		// RSummaryCode,
		// RDplyrCode,
		// PythonFunctionCode,
		// PythonPandasCode,
		// PythonPlotCode,
		// SQLQueryCSVCode,
		// SQLQueryParquetCode,
		// SQLCreateTableCode,
	].forEach((code, i) => {
		cells[orders[i]] = {
			code: code.trim(),
			lang:
				i >= 3
					? i >= 6
						? CellLanguage.SQL
						: CellLanguage.PYTHON
					: CellLanguage.R,
			results: undefined,
			autoExecute: false,
			pending: false,
			success: undefined,
			error: undefined,
		};
	});

	return { cells, orders };
};

export const getInitialCommands = () => {
	const ids = Array.from({ length: 3 }, () => generateId());
	return {
		PYTHON: {
			prompt: "",
			orders: [ids[0]],
			commands: {
				[ids[0]]: {
					code: "",
					results: undefined,
					pending: false,
				},
			},
		},
		R: {
			prompt: "",
			orders: [ids[1]],
			commands: {
				[ids[1]]: {
					code: "",
					results: undefined,
					pending: false,
				},
			},
		},
		SQL: {
			prompt: "",
			orders: [ids[2]],
			commands: {
				[ids[2]]: {
					code: "",
					results: undefined,
					pending: false,
				},
			},
		},
	};
};

export const getInitialEditorPanes = () => {
	return {
		activePane: CellLanguage.R,
		panes: {
			[CellLanguage.R]: {
				code: RDplyrCode,
			},
			[CellLanguage.PYTHON]: {
				code: PythonPlotCode,
			},
			[CellLanguage.SQL]: {
				code: SQLQueryCSVCode,
			},
		},
	};
};
