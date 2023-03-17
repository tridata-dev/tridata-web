import { CellLanguage } from "@/lib/constants";
import type { WebR } from "@r-wasm/webr";
import type { PyodideInterface } from "pyodide";
import type { Database } from "sql.js";

export type REngine = WebR;
export type PYTHONEngine = PyodideInterface;
export type SQLEngine = Database;

export type CellResult = RCellResult;

export type RCellResultType = "stdout" | "stderr" | "canvasExec" | "prompt";
export type RCellResult = {
	type: RCellResultType;
	data: string;
};

export type Cell = {
	lang: CellLanguage;
	code: string;
	results: RCellResult[];
	pending: boolean;
	success: boolean | undefined;
	error: boolean | undefined;
};

export type CodeStore = {
	REngine: REngine | null;
	RPrompt: string;
	PYTHONEngine: PYTHONEngine | null;
	SQLEngine: SQLEngine | null;
	cells: Map<string, Cell>;
	orders: string[];
};
