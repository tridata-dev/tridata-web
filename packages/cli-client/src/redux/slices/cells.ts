import { Cell, RequireOnly } from "@/types";
import { CellLanguage } from "@/lib/constants";
import { getInitialCells } from "@/lib/mock";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateId } from "@/lib/utils";
import { runCell } from "../thunks/cells";

type CellsState = {
	cells: Record<string, Cell>;
	orders: string[];
};

type DraftCell = RequireOnly<Cell, "lang">;

const createCell = (draft: DraftCell): Cell => {
	return {
		lang: draft.lang,
		code: draft.code || "",
		results: draft.results ? draft.results : undefined,
		autoExecute: Boolean(draft.autoExecute),
		pending: Boolean(draft.pending),
		success: Boolean(draft.success),
		error: Boolean(draft.error),
	};
};

const initialState: CellsState = {
	cells: {},
	orders: [],
};

const cellsSlice = createSlice({
	name: "cells",
	initialState,
	reducers: {
		pushCell(state, action: PayloadAction<DraftCell>) {
			const id = generateId();
			state.cells[id] = createCell(action.payload);
			state.orders.unshift(id);
		},
		insertCell(
			state,
			action: PayloadAction<{ afterId: string; lang?: CellLanguage }>,
		) {
			const { afterId, lang } = action.payload;
			const { cells, orders } = state;
			const id = generateId();
			const prevCell = cells[afterId];
			const cell = createCell({ lang: lang || prevCell.lang });
			cells[id] = cell;
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
			cell.results = undefined;
			cell.success = undefined;
			cell.error = undefined;
		},
		clearResults(state, action: PayloadAction<{ id: string }>) {
			const { id } = action.payload;
			const cell = state.cells[id];
			cell.results = undefined;
			cell.success = false;
			cell.error = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(runCell.pending, (state, action) => {
			const { id } = action.meta.arg;
			const cell = state.cells[id];
			cell.results = undefined;
			cell.pending = true;
			cell.success = undefined;
			cell.error = undefined;
		});
		builder.addCase(runCell.fulfilled, (state, action) => {
			const { id } = action.meta.arg;
			const { data, error } = action.payload;
			const cell = state.cells[id];
			cell.results = data;
			cell.autoExecute = false;
			cell.pending = false;
			cell.success = !error;
			cell.error = error;
		});
		builder.addCase(runCell.rejected, (state, action) => {
			const { id } = action.meta.arg;
			const cell = state.cells[id];
			cell.autoExecute = false;
			cell.pending = false;
			cell.error = true;
			cell.success = false;
		});
	},
});

export const cellsActions = { ...cellsSlice.actions, runCell };
export const cellsReducer = cellsSlice.reducer;
