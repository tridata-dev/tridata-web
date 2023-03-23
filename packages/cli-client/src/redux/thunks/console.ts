import { CellLanguage } from "@/lib/constants";
import {
	CodeResults,
	Engine,
	PythonCellResult,
	RCellResult,
	SQLCellResult,
} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PythonEngine, TridataError } from "@tridata/core";
import type { REngine } from "@tridata/core";
import { SqlEngine } from "@tridata/core";
import { runR } from "@/lib/r";
import { runSQL } from "@/lib/sql";
import { runPython } from "@/lib/python";

export const runCommand = createAsyncThunk<
	CodeResults,
	{ id: string; lang: CellLanguage; engine: Engine },
	{ state: RootState; rejectValue: TridataError }
>(
	"console/runCode",
	async ({ id, lang, engine }, { getState, rejectWithValue }) => {
		const { commands } = getState().console[lang];
		const command = commands[id];
		const { code } = command;

		if (lang === CellLanguage.R) {
			const results = await runR({ code, engine: engine as REngine });
			return results as RCellResult[];
		} else if (lang === CellLanguage.PYTHON) {
			const result = await runPython({ code, engine: engine as PythonEngine });
			return result;
		} else {
			try {
				const result = await runSQL({ code, engine: engine as SqlEngine });
				return { type: "stdout", data: result } as SQLCellResult;
			} catch {
				return { type: "stderr", data: "SQL Execution error" } as SQLCellResult;
			}
		}
	},
);
