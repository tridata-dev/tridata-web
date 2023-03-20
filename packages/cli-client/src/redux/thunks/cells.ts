import { CellLanguage } from "@/lib/constants";
import {
	CodeResults,
	Engine,
	RCellResult,
	RCellResultType,
	SQLCellResult,
} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TridataError, TridataErrorName } from "@tridata/core";
import type { REngine } from "@tridata/core";
import { SqlEngine } from "@tridata/core";
import { runR } from "@/lib/r";
import { runSQL } from "@/lib/sql";

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

	if (lang === CellLanguage.SQL) {
		try {
			const result = await runSQL({ code, engine: engine as SqlEngine });
			return {
				data: [result],
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
