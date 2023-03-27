import {
	BaseEditorTheme,
	CodeEditorTheme,
	makeKeyboardShortcuts,
	pythonExtensions,
	rExtensions,
	sqlExtensions,
} from "@/lib/editor";
import { useReduxSelector } from "@/redux/store";
import { Command, EditorView } from "@codemirror/view";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useReduxActions } from "@/hooks/redux";
import { CellLanguage } from "@/lib/constants";

export default function CodeEditor() {
	const { setPaneCode } = useReduxActions();
	const { panes, activePane } = useReduxSelector((state) => state.editor);
	const { code } = panes[activePane];

	const editor = useRef<HTMLInputElement>(null);
	const { pushCell } = useReduxActions();
	const { theme, lineNumbers } = useReduxSelector(
		(state) => state.settings.editor,
	);

	const runSelection: Command = useCallback((view: EditorView) => {
		// run selection in the editor
		// if no selection, run all the content before the cursor
		let { from, to, head } = view.state.selection.main;
		const selection = view.state.sliceDoc(from, to);
		let code: string;
		if (selection) {
			code = selection;
		} else {
			to = view.state.doc.lineAt(head).to;
			code = view.state.sliceDoc(0, to);
		}
		pushCell({ lang: activePane, code, autoExecute: true });
		return true;
	}, []);

	const extensions = useMemo(() => {
		const baseExtensions = [
			BaseEditorTheme,
			CodeEditorTheme,
			EditorView.lineWrapping,
			makeKeyboardShortcuts([
				{
					key: "Shift-Enter",
					run: runSelection,
					preventDefault: true,
				},
			]),
		];

		if (activePane === CellLanguage.R) {
			baseExtensions.push(...rExtensions);
		} else if (activePane === CellLanguage.PYTHON) {
			baseExtensions.push(...pythonExtensions);
		} else if (activePane === CellLanguage.SQL) {
			baseExtensions.push(sqlExtensions);
		}

		return baseExtensions;
	}, [activePane]);

	const { setContainer } = useCodeMirror({
		container: editor.current,
		value: code,
		onChange: (code) => setPaneCode({ pane: activePane, code }),
		extensions,
		theme,
		basicSetup: {
			lineNumbers,
		},
	});

	useEffect(() => {
		if (editor.current) {
			setContainer(editor.current);
		}
	}, []);

	return <div ref={editor} />;
}
