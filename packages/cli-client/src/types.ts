import { CellLanguage } from "@/lib/constants";
import type { REngine, PythonEngine, SqlEngine } from "@tridata/core";

export type Engine = REngine | PythonEngine | SqlEngine;
export type CellResults = RCellResult[] | SQLCellResult[];

export type RCellResultType = "stdout" | "stderr" | "canvasExec" | "prompt";
export type RCellResult = {
	type: RCellResultType;
	data: string;
};

export type SQLCellResult = {
	nrow: number;
	ncol: number;
	schema: { name: string; type: string }[];
	values: Array<string | number>[];
};

export type Cell = {
	lang: CellLanguage;
	code: string;
	results: CellResults;
	pending: boolean;
	success: boolean | undefined;
	error: boolean | undefined;
};
