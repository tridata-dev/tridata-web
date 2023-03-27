import { CellLanguage } from "@/lib/constants";
import { getInitialEditorPanes } from "@/lib/mock";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type EditorSliceState = {
	activePane: CellLanguage;
	panes: Record<
		CellLanguage,
		{
			code: string;
		}
	>;
};

const initialState = getInitialEditorPanes() as EditorSliceState;

const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		switchPane(state, action: PayloadAction<CellLanguage>) {
			state.activePane = action.payload;
		},
		setPaneCode(
			state,
			action: PayloadAction<{ pane: CellLanguage; code: string }>,
		) {
			const { pane, code } = action.payload;
			state.panes[pane].code = code;
		},
	},
});

export const editorActions = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
