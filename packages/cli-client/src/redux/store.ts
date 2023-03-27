import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer } from "./slices/cells";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { enableMapSet } from "immer";
import { settingsReducer } from "./slices/settings";
import { consoleReducer } from "./slices/console";
import { editorReducer } from "./slices/editor";

enableMapSet();

export const store = configureStore({
	reducer: {
		editor: editorReducer,
		cells: cellsReducer,
		settings: settingsReducer,
		console: consoleReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
