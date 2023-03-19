import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer } from "./slices/cells";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { enableMapSet } from "immer";
import { editorReducer } from "./slices/editor";
import { consoleReducer } from "./slices/console";

enableMapSet();

export const store = configureStore({
	reducer: {
		cells: cellsReducer,
		editor: editorReducer,
		console: consoleReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
