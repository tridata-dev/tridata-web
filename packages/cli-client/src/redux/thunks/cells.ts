import { CellLanguage } from "@/lib/constants";
import {
	CellResult,
	RCellResult,
	RCellResultType,
	REngine,
} from "@/types/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TridataError, TridataErrorName } from "@tridata/core";

export const runCode = createAsyncThunk<
	CellResult[],
	{ id: string },
	{ state: RootState; rejectValue: TridataError }
>("cells/runCode", async ({ id }, { getState, rejectWithValue }) => {
	const { cells } = getState();
	const { code, lang } = cells.cells[id];
	const engine = cells.engines[lang];
	if (!engine) {
		const errorName = TridataErrorName.WEBR_NOT_FOUND;
		return rejectWithValue(
			new TridataError({
				name: errorName,
				message:
					"The R engine is not initialized or has lost connection, please load again",
			}),
		);
	}

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

	return [];
});
