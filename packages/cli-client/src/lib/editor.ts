import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { EditorView, keymap, KeyBinding } from "@codemirror/view";
import { CompletionContext, snippetCompletion } from "@codemirror/autocomplete";
import { rCompletions, sqlCompletions, pythonCompletions } from "./completions";
import { vim } from "@replit/codemirror-vim";

const rCompleter = (context: CompletionContext) => {
	let word = context.matchBefore(/(%|\||\w*)/);
	if (word) {
		if (word.from === word.to && !context.explicit) return null;
		return {
			from: word.from,
			options: rCompletions,
		};
	}
};

const sqlCompleter = (context: CompletionContext) => {
	let word = context.matchBefore(/\w*/);
	if (word) {
		if (word.from === word.to && !context.explicit) return null;
		return {
			from: word.from,
			options: sqlCompletions,
		};
	}
};

const pythonCompleter = (context: CompletionContext) => {
	let word = context.matchBefore(/\w*/);
	if (word) {
		if (word.from === word.to && !context.explicit) return null;
		return {
			from: word.from,
			options: pythonCompletions,
		};
	}
};

export const BaseEditorTheme = EditorView.baseTheme({
	"&": {
		padding: "5px",
	},
	".cm-content": {
		fontFamily: "Fira Code, monospace",
	},
	".cm-gutters": {
		display: "none",
	},
});

export const CellEditorTheme = EditorView.theme({
	"&": {
		borderRadius: "5px",
	},
	".cm-content": {
		fontSize: "13px",
	},
});

export const CodeEditorTheme = EditorView.theme({
	".cm-content": {
		fontSize: "16px",
	},
});

export const makeKeyboardShortcuts = (keybindings: readonly KeyBinding[]) => {
	return keymap.of(keybindings);
};

const rBaseExtension = StreamLanguage.define(r);
const pythonBaseExtension = python();
const sqlBaseExtension = sql();

export const vimExtension = vim();

export const rExtensions = [
	rBaseExtension,
	rBaseExtension.data.of({ autocomplete: rCompleter }),
];
export const pythonExtensions = [
	pythonBaseExtension,
	python().language.data.of({
		autocomplete: pythonCompleter,
	}),
];
export const sqlExtensions = [
	sqlBaseExtension,
	sqlBaseExtension.language.data.of({
		autocomplete: sqlCompleter,
	}),
];
