import { CellLanguage } from "@/lib/constants";
import type { REngine, SqlEngine, PythonEngine } from "@tridata/core";

export type RequireOnly<T, P extends keyof T> = Partial<Omit<T, P>> &
	Required<Pick<T, P>>;

export type Engine = REngine | PythonEngine | SqlEngine;
export type ResultVariant = "cell" | "command";

export type RCellResultType = "stdout" | "stderr" | "canvasExec" | "prompt";
export type RCellResult = {
	type: RCellResultType;
	data: string;
};
export type SQLCellResultType = "stdout" | "stderr";

export type SQLCellResult =
	| {
			type: "stdout";
			data: {
				nrow: number;
				ncol: number;
				schema: { name: string; type: string }[];
				values: Array<string | number>[];
			};
	  }
	| { type: "stderr"; data: string };

export type PythonCellResultType = "stdout" | "stderr";
export type PythonCellResult = {
	type: PythonCellResultType;
	data: string;
};

export type CodeResults = RCellResult[] | SQLCellResult | PythonCellResult;
export type Cell = {
	lang: CellLanguage;
	code: string;
	results: CodeResults | undefined;
	autoExecute: boolean;
	pending: boolean;
	success: boolean | undefined;
	error: boolean | undefined;
};

export type Command = {
	code: string;
	results: CodeResults | undefined;
	pending: boolean;
};

export type ConsoleLanguageState = {
	prompt: string;
	orders: string[];
	commands: Record<string, Command>;
};
