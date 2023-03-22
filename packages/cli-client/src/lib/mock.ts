import RDplyrCode from "@/assets/r/dplyr.R?raw";
import RPlotCode from "@/assets/r/plot.R?raw";
import RSummaryCode from "@/assets/r/summary.R?raw";
import SQLQueryCSVCode from "@/assets/sql/query_csv.sql?raw";
import SQLQueryParquetCode from "@/assets/sql/query_parquet.sql?raw";
import SQLCreateTableCode from "@/assets/sql/create_table.sql?raw";
import { generateId } from "./utils";
import { CellLanguage } from "./constants";
import { Cell } from "@/types";

export const getInitialCells = () => {
	const cells: Record<string, Cell> = {};
	const orders = Array.from({ length: 6 }, () => generateId());

	[
		RPlotCode,
		RSummaryCode,
		RDplyrCode,
		SQLQueryCSVCode,
		SQLQueryParquetCode,
		SQLCreateTableCode,
	].forEach((code, i) => {
		cells[orders[i]] = {
			code: code.trim(),
			lang: i >= 3 ? CellLanguage.SQL : CellLanguage.R,
			results: undefined,
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
					results: [],
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
					results: [],
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
					results: [],
					pending: false,
				},
			},
		},
	};
};
