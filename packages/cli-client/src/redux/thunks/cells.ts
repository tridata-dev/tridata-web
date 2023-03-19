import { CellLanguage } from "@/lib/constants";
import {
	CellResults,
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

export const runCode = createAsyncThunk<
	{ data: CellResults; error: boolean },
	{ id: string; engine: Engine },
	{ state: RootState; rejectValue: TridataError }
>("cells/runCode", async ({ id, engine }, { getState, rejectWithValue }) => {
	const { cells } = getState().cells;
	const cell = cells[id];
	const { lang, code } = cell;

	if (lang === CellLanguage.R) {
		const rEngine = engine as REngine;
		console.log("running R code", code);
		rEngine.writeConsole(code + "\n");

		let read = await rEngine.read();
		let currentData = "";
		let currentType = read.type as RCellResultType;
		const results: RCellResult[] = [];
		while (currentType !== "prompt") {
			currentData += read.data + "\n";
			read = await rEngine.read();
			if (read.type !== currentType || read.data.startsWith("clearRect")) {
				const result = {
					type: currentType,
					data: currentData,
				};
				results.push(result);
				currentData = "";
				currentType = read.type as RCellResultType;
			}
		}
		const error = results.some((r) => r.type === "stderr");
		return { data: results, error };
	}

	if (lang === CellLanguage.SQL) {
		console.log("running SQL code", code);
		const sqlEngine = engine as SqlEngine;
		const q = await sqlEngine.query(code);
		const records = q.toArray();
		const schema = q.schema.fields.map((f) => ({
			name: f.name,
			type: String(f.type),
		}));
		const nrow = q.numRows;
		const ncol = q.numCols;
		const values: SQLCellResult["values"] = [];
		const nMax = Math.min(100, nrow);
		for (let i = 0; i < nMax; i++) {
			values.push(Object.values(records[i]));
		}
		const result: SQLCellResult = {
			nrow,
			ncol,
			schema,
			values,
		};
		return {
			data: [result],
			error: false,
		};
		// results = qa;
		// for (const row of qa) {
		// 	console.log("row", row);
		// }
		// console.log("JSON parse", JSON.parse(qs));
	}

	return {
		data: [] as CellResults,
		error: true,
	};
});
