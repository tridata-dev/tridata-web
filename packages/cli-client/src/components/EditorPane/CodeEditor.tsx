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
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useReduxActions } from "@/hooks/redux";
import { CellLanguage, CellLanguages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/local-storage";
import PlayIcon from "../icons/Play";
import { useRunEditorSelection } from "@/hooks/run-code";
import { useEngine } from "@/hooks/engines";

export default function CodeEditor() {
	const [vimMode, setVimMode] = useLocalStorage("vim_mode", false);
	const runSelection = useRunEditorSelection();
	const { switchPane } = useReduxActions();
	const { setPaneCode } = useReduxActions();
	const { panes, activePane } = useReduxSelector((state) => state.editor);
	const { code } = panes[activePane];
	const { engine, pending, initEngineFunc } = useEngine({ lang: activePane });

	const editor = useRef<HTMLInputElement>(null);
	const { pushCell } = useReduxActions();
	const { theme, lineNumbers } = useReduxSelector(
		(state) => state.settings.editor,
	);

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

	const { setContainer, state: editorState } = useCodeMirror({
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
		<section className="code-editor relative group">
			<header className="rounded-t-md flex justify-between items-center">
				<div className="tabs gap-2 font-mono">
					{CellLanguages.map((lang) => (
						<button
							className={cn("tab px-2", {
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
					<span className="label-text text-sm mr-2">vim</span>
					<input
						type="checkbox"
						className="toggle bg-indigo-400 toggle-sm"
						onChange={(e) => setVimMode(e.target.checked)}
						checked={vimMode}
					/>
				</label>
			</header>
			<div ref={editor} />
			<footer className="absolute right-1 bottom-1 hidden group-hover:block group-focus:block">
				{!engine ? (
					<button
						className="btn btn-secondary btn-outline z-10"
						disabled={pending && !engine}
						onClick={() => initEngineFunc()}
					>
						{pending ? "Initializing ..." : "Initialize"}
					</button>
				) : (
					<button
						onClick={() => {
							pushCell({ lang: activePane, code, autoExecute: true });
						}}
					>
						<PlayIcon className="w-8 h-8 hover:stroke-primary" />
					</button>
				)}
			</footer>
		</section>
	);
}
