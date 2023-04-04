import { CellLanguage } from "@/lib/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SettingsState = {
	editor: {
		theme: "light" | "dark";
		lineNumbers: false;
	};
	[CellLanguage.R]: {
		packages: string[];
		autoInit: boolean;
	};
	[CellLanguage.PYTHON]: {
		packages: string[];
		autoInit: boolean;
	};
	[CellLanguage.SQL]: {
		autoInit: boolean;
	};
};

const initialState: SettingsState = {
	editor: {
		theme: "dark",
		lineNumbers: false,
	},
	[CellLanguage.R]: {
		packages: ["dplyr"],
		autoInit: true,
	},
	[CellLanguage.PYTHON]: {
		packages: ["pandas", "matplotlib"],
		autoInit: false,
	},
	[CellLanguage.SQL]: {
		autoInit: false,
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
