import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type EditorState = {
	theme: "light" | "dark";
	lineNumbers: false;
};

const initialState: EditorState = {
	theme: "dark",
	lineNumbers: false,
};

const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setEditorConfig(state, action: PayloadAction<EditorState>) {
			state = { ...state, ...action.payload };
		},
	},
});

export const editorActions = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
