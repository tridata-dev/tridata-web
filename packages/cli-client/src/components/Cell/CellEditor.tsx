import { useReduxActions } from "@/hooks/redux";
import { cn, dismissDropdown } from "@/lib/utils";
import { useReduxSelector } from "@/redux/store";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useEffect, useMemo, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { CellLanguage, CellLanguages } from "@/lib/constants";
import ChevronDownIcon from "../icons/ChevronDown";
import { Cell } from "@/types";
import {
	CellEditorTheme,
	makeKeyboardShortcuts,
	pythonExtensions,
	rExtensions,
	sqlExtensions,
} from "@/lib/editor";
import CellControlSettings from "./CellControlSettings";
import { useLocalStorage } from "@/hooks/local-storage";
import { useRunCode, useRunEditorSelection } from "@/hooks/run-code";

const languageColor: Record<CellLanguage, string> = {
	[CellLanguage.R]: "bg-[#1E63B4]",
	[CellLanguage.PYTHON]: "bg-[#4b8bbe]",
	[CellLanguage.SQL]: "bg-[#FEB301]",
};

const LanguageSwitch = ({ id, lang }: { id: string; lang: CellLanguage }) => {
	const { setCellLanguage } = useReduxActions();

	const switchLanguage = (lang: CellLanguage) => {
		setCellLanguage({ id, lang });
		dismissDropdown();
	};

	return (
		<div className="dropdown dropdown-bottom text-sm font-mono">
			<button
				className=" bg-indigo-400 text-black rounded-t-md px-2 py-1 inline-flex w-24 justify-center items-center gap-1"
				tabIndex={0}
			>
				{lang}
				<ChevronDownIcon className="w-4 h-4" />
			</button>
			<ul className="dropdown-content menu w-24 text-sm bg-base-100">
				{CellLanguages.map((lang) => (
					<li key={lang}>
						<button onClick={() => switchLanguage(lang)}>{lang}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

type Props = {
	id: string;
	cell: Cell;
};

export default function CellEditor({ id, cell }: Props) {
	const { setCellCode } = useReduxActions();
	const { theme, lineNumbers } = useReduxSelector(
		(state) => state.settings.editor,
	);
	const runCell = useRunCode({ id, lang: cell.lang });
	const editor = useRef<HTMLInputElement>(null);

	const { code, lang } = cell;

	const extensions = useMemo(() => {
		const baseExtensions = [
			CellEditorTheme,
			EditorView.lineWrapping,
			makeKeyboardShortcuts([
				{
					key: "Shift-Enter",
					run: (view) => {
						runCell();
						return true;
					},
					preventDefault: true,
				},
			]),
		];

		if (lang === CellLanguage.R) {
			baseExtensions.push(rExtensions);
		} else if (lang === CellLanguage.PYTHON) {
			baseExtensions.push(pythonExtensions);
		} else {
			baseExtensions.push(sqlExtensions);
		}

		return baseExtensions;
	}, [cell.lang]);

	const { setContainer } = useCodeMirror({
		container: editor.current,
		onChange: (code) => setCellCode({ id, code }),
		value: code,
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
	}, [editor.current]);

	return (
		<div className="editor-wrapper">
			<LanguageSwitch lang={cell.lang} id={id} />
			<div className="flex">
				<div
					ref={editor}
					className={cn(
						"relative border-2 border-indigo-400 rounded-b-md flex-1 -z-50",
						{
							"cell-pending": cell.pending,
							"border-2 border-green-400": cell.success,
							"border-2 border-red-700": cell.error,
						},
					)}
				/>
				<CellControlSettings id={id} />
			</div>
		</div>
	);
}
