import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer } from "./slices/cells";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { enableMapSet } from "immer";
import { settingsReducer } from "./slices/settings";
import { consoleReducer } from "./slices/console";

enableMapSet();

export const store = configureStore({
	reducer: {
		cells: cellsReducer,
		settings: settingsReducer,
		console: consoleReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
