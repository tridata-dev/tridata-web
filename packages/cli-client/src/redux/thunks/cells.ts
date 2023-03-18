import { CellLanguage } from "@/lib/constants";
import {
	CellResult,
	Engine,
	EngineConfig,
	RCellResult,
	RCellResultType,
	REngine,
	SqlEngine,
} from "@/types/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TridataError, TridataErrorName } from "@tridata/core";

export const runCode = createAsyncThunk<
	CellResult[],
	{ id: string; engine: Engine },
	{ state: RootState; rejectValue: TridataError }
>("cells/runCode", async ({ id, engine }, { getState, rejectWithValue }) => {
	const { cells } = getState().cells;
	const { lang, code } = cells[id];

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
		return results;
	}

	if (lang === CellLanguage.SQL) {
		const sqlEngine = engine as SqlEngine;
		console.log(sqlEngine.exec(code));
	}

	return [];
});
