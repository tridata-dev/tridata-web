import {
	BaseEditorTheme,
	CodeEditorTheme,
	makeKeyboardShortcuts,
	pythonExtensions,
	rExtensions,
	sqlExtensions,
	vimExtension,
} from "@/lib/editor";
import { useReduxSelector } from "@/redux/store";
import { Command, EditorView } from "@codemirror/view";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReduxActions } from "@/hooks/redux";
import { CellLanguage, CellLanguages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/local-storage";

export default function CodeEditor() {
	const [vimMode, setVimMode] = useLocalStorage("vim_mode", false);
	const { switchPane } = useReduxActions();
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
		const { from, to, head } = view.state.selection.main;
		const selection = view.state.sliceDoc(from, to);
		if (selection) {
			pushCell({ lang: activePane, code: selection, autoExecute: true });
		} else {
			const { number, text } = view.state.doc.lineAt(head);
			// const codeBlock = [text]
			// while (number > 1) {
			// 	number--;
			// 	const line = view.state.doc.line(number)
			// 	console.log(line)
			// 	if (line.text.trim() === "") {
			// 		break
			// 	}
			// 	codeBlock.unshift(line.text)
			// }
			// const code = codeBlock.join("\n")
			pushCell({ lang: activePane, code: text, autoExecute: true });
		}
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

		if (vimMode) {
			baseExtensions.push(vimExtension);
		}

		if (activePane === CellLanguage.R) {
			baseExtensions.push(...rExtensions);
		} else if (activePane === CellLanguage.PYTHON) {
			baseExtensions.push(...pythonExtensions);
		} else if (activePane === CellLanguage.SQL) {
			baseExtensions.push(sqlExtensions);
		}

		return baseExtensions;
	}, [activePane, vimMode]);

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

	return (
		<>
			<header className="rounded-t-md flex justify-between items-center">
				<div className="tabs gap-2 font-mono">
					{CellLanguages.map((lang) => (
						<button
							className={cn("tab tab-bordered w-16 px-2", {
								"tab-active": lang === activePane,
							})}
							key={lang}
							onClick={() => {
								switchPane(lang);
							}}
						>
							{lang}
						</button>
					))}
				</div>
				<label className="cursor-pointer label">
					<span className="label-text text-sm mr-2">vim mode</span>
					<input
						type="checkbox"
						className="toggle bg-indigo-400 toggle-sm"
						onChange={(e) => setVimMode(e.target.checked)}
						checked={vimMode}
					/>
				</label>
			</header>
			<div ref={editor} />
		</>
	);
}
