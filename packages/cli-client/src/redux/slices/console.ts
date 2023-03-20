import { CellLanguage, CellLanguages } from "@/lib/constants";
import { getInitialCommands } from "@/lib/mock";
import { generateId } from "@/lib/utils";
import { ConsoleLanguageState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { runCommand } from "@/redux/thunks/console";

type ConsoleState = {
	R: ConsoleLanguageState;
	PYTHON: ConsoleLanguageState;
	SQL: ConsoleLanguageState;
};

const initialState: ConsoleState = getInitialCommands();

const consoleSlice = createSlice({
	name: "console",
	initialState: initialState,
	reducers: {
		setPrompt(
			state,
			action: PayloadAction<{ lang: CellLanguage; prompt: string }>,
		) {
			const { lang, prompt } = action.payload;
			state[lang].prompt = prompt;
		},
		addCommand(state, action: PayloadAction<{ lang: CellLanguage }>) {
			const { lang } = action.payload;
			const id = generateId();
			state[lang].orders.push(id);
			state[lang].commands[id] = {
				code: "",
				results: [],
				pending: false,
			};
		},
		updateCommand(
			state,
			action: PayloadAction<{ lang: CellLanguage; id: string; code: string }>,
		) {
			const { lang, id, code } = action.payload;
			state[lang].commands[id].code = code;
		},
		clearPreviousCommands(
			state,
			action: PayloadAction<{ id: string; lang: CellLanguage }>,
		) {
			const { id, lang } = action.payload;
			const { orders, commands } = state[lang];
			const index = orders.indexOf(id);
			const prevIds = orders.slice(0, index);
			prevIds.forEach((id) => delete commands[id]);
			orders.splice(0, index);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(runCommand.pending, (state, action) => {
			const { lang, id } = action.meta.arg;
			state[lang].commands[id].pending = true;
		});

		builder.addCase(runCommand.fulfilled, (state, action) => {
			const { lang, id } = action.meta.arg;
			const results = action.payload;
			state[lang].commands[id].results = results;
			state[lang].commands[id].pending = false;
			const newId = generateId();
			state[lang].orders.push(newId);
			state[lang].commands[newId] = {
				code: "",
				results: [],
				pending: false,
			};
		});
	},
});

export const consoleActions = { ...consoleSlice.actions, runCommand };
export const consoleReducer = consoleSlice.reducer;
