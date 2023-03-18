import { CellLanguage } from "@/lib/constants";
import type { WebR } from "@r-wasm/webr";
import type { PyodideInterface } from "pyodide";
import type { Database } from "sql.js";

export type REngine = WebR;
export type PythonEngine = PyodideInterface;
export type SqlEngine = Database;
export type Engine = REngine | PythonEngine | SqlEngine;

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

export type EngineConfig = { lang: CellLanguage; engine: Engine };
