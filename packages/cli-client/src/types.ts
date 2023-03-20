import { CellLanguage } from "@/lib/constants";
import type { REngine, PythonEngine, SqlEngine } from "@tridata/core";

export type Engine = REngine | PythonEngine | SqlEngine;
export type CodeResults = RCellResult[] | SQLCellResult[];

export type ResultVariant = "cell" | "command";

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
	results: CodeResults;
	pending: boolean;
	success: boolean | undefined;
	error: boolean | undefined;
};

export type Command = {
	code: string;
	results: CodeResults;
	pending: boolean;
};

export type ConsoleLanguageState = {
	prompt: string;
	orders: string[];
	commands: Record<string, Command>;
};
