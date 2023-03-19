import { Cell } from "@/types";
import { CellLanguage } from "@/lib/constants";
import { getInitialCells } from "@/lib/mock";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "@/lib/utils";
import { runCode } from "../thunks/cells";

type CellsState = {
	prompts: { [key in CellLanguage]: string };
	cells: Record<string, Cell>;
	orders: string[];
};

const initialState: CellsState = {
	prompts: {
		R: "",
		PYTHON: "",
		SQL: "",
	},
	...getInitialCells(),
};

const cellsSlice = createSlice({
	name: "cells",
	initialState,
	reducers: {
		setPrompt(
			state,
			action: PayloadAction<{ lang: CellLanguage; prompt: string }>,
		) {
			const { lang, prompt } = action.payload;
			state.prompts[lang] = prompt;
		},
		insertCell(
			state,
			action: PayloadAction<{ afterId: string; lang?: CellLanguage }>,
		) {
			const { afterId, lang } = action.payload;
			const { cells, orders } = state;
			const id = generateId();
			const prevCell = cells[afterId];
			cells[id] = {
				lang: lang || prevCell.lang,
				code: "",
				results: [],
				pending: false,
				success: undefined,
				error: undefined,
			};
			const index = orders.indexOf(afterId);
			orders.splice(index + 1, 0, id);
		},
		deleteCell(state, action: PayloadAction<{ id: string }>) {
			const { id } = action.payload;
			const { cells, orders } = state;
			delete cells[id];
			orders.splice(orders.indexOf(id), 1);
		},
		setCellCode(state, action: PayloadAction<{ id: string; code: string }>) {
			const { id, code } = action.payload;
			const cell = state.cells[id];
			cell.code = code;
		},
		setCellLanguage(
			state,
			action: PayloadAction<{ id: string; lang: CellLanguage }>,
		) {
			const { id, lang } = action.payload;
			const cell = state.cells[id];
			cell.lang = lang;
		},
		clearResults(state, action: PayloadAction<{ id: string }>) {
			const { id } = action.payload;
			const cell = state.cells[id];
			cell.results = [];
			cell.success = false;
			cell.error = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(runCode.pending, (state, action) => {
			const { id } = action.meta.arg;
			const cell = state.cells[id];
			cell.pending = true;
			cell.success = undefined;
			cell.error = undefined;
		});
		builder.addCase(runCode.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			const { data, error } = action.payload;
			const cell = state.cells[id];
			cell.results = data;
			cell.pending = false;
			cell.success = !error;
			cell.error = error;
		});
		builder.addCase(runCode.rejected, (state, action) => {
			const { id } = action.meta.arg;
			const cell = state.cells[id];
			cell.pending = false;
			cell.error = true;
			cell.success = false;
		});
	},
});

export const cellsActions = { ...cellsSlice.actions, runCode };
export const cellsReducer = cellsSlice.reducer;
