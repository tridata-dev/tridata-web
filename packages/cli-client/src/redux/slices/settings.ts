import { CellLanguage } from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SettingsState = {
	editor: {
		theme: "light" | "dark";
		lineNumbers: false;
	};
	[CellLanguage.R]: {
		packages: string[];
	};
	[CellLanguage.PYTHON]: {
		packages: string[];
	};
};

const initialState: SettingsState = {
	editor: {
		theme: "dark",
		lineNumbers: false,
	},
	[CellLanguage.R]: {
		packages: ["dplyr"],
	},
	[CellLanguage.PYTHON]: {
		packages: ["pandas", "matplotlib"],
	},
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setEditorConfig(state, action: PayloadAction<SettingsState>) {
			state = { ...state, ...action.payload };
		},
		setRSettings(state, action: PayloadAction<SettingsState[CellLanguage.R]>) {
			state[CellLanguage.R] = { ...state[CellLanguage.R], ...action.payload };
		},
		setPythonSettings(
			state,
			action: PayloadAction<SettingsState[CellLanguage.PYTHON]>,
		) {
			state[CellLanguage.PYTHON] = {
				...state[CellLanguage.PYTHON],
				...action.payload,
			};
		},
	},
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
