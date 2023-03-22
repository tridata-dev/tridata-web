import { CellLanguage } from "@/lib/constants";
import { CodeResults, Engine } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PythonEngine, TridataError } from "@tridata/core";
import type { REngine } from "@tridata/core";
import { SqlEngine } from "@tridata/core";
import { runR } from "@/lib/r";
import { runSQL } from "@/lib/sql";
import { runPython } from "@/lib/python";

export const runCell = createAsyncThunk<
	{ data: CodeResults; error: boolean },
	{ id: string; engine: Engine },
	{ state: RootState; rejectValue: TridataError }
>("cells/runCode", async ({ id, engine }, { getState, rejectWithValue }) => {
	const { cells } = getState().cells;
	const cell = cells[id];
	const { lang, code } = cell;

	if (lang === CellLanguage.R) {
		const results = await runR({ code, engine: engine as REngine });
		const error = results.some((r) => r.type === "stderr");
		return { data: results, error };
	}

	if (lang === CellLanguage.PYTHON) {
		const result = await runPython({ code, engine: engine as PythonEngine });
		return {
			data: result,
			error: result.type === "stderr",
		};
	}

	if (lang === CellLanguage.SQL) {
		try {
			const result = await runSQL({ code, engine: engine as SqlEngine });
			return {
				data: result,
				error: false,
			};
		} catch {
			return {
				data: [],
				error: true,
			};
		}
	}

	return {
		data: [],
		error: false,
	};
});
