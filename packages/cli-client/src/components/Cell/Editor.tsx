import { useReduxActions } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { useReduxSelector } from "@/redux/store";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useEffect, useMemo, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CellLanguage, CellLanguages } from "@/lib/constants";
import ChevronDownIcon from "../icons/ChevronDown";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { Cell } from "@/types";

const SelectLanguage = ({ id, lang }: { id: string; lang: CellLanguage }) => {
	const { setCellLanguage } = useReduxActions();

	return (
		<Menu
			as="div"
			className="inline-block absolute right-[5px] top-[5px] bg-indigo-100 hover:bg-indigo-200 rounded-md font-mono"
		>
			<div>
				<Menu.Button className="inline-flex w-full justify-center text-xs gap-x-0.5 rounded-md px-2 py-1 text-gray-900 shadow-sm hover:opacity-20">
					<span>{lang}</span>
					<ChevronDownIcon
						className="w-4 h-4 text-gray-400"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-indigo-100 shadow-lg  focus:outline-none text-sm">
					<div className="py-1">
						{CellLanguages.map((lang) => (
							<Menu.Item key={lang}>
								{({ active }) => (
									<button
										className={cn(
											active ? "bg-indigo-200 text-gray-900" : "text-gray-700",
											"block px-2 py-1 text-xs w-full text-left",
										)}
										onClick={() => setCellLanguage({ id, lang })}
									>
										{lang}
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

const editorBaseTheme = EditorView.baseTheme({
	"&": {
		padding: "5px",
		borderRadius: "5px",
	},
	".cm-content": {
		fontFamily: "Fira Code, monospace",
		fontSize: "14px",
	},
	".cm-gutters": {
		display: "none",
	},
});

type Props = {
	id: string;
	cell: Cell;
};

export default function Editor({ id, cell }: Props) {
	const { setCellCode } = useReduxActions();
	const { theme, lineNumbers } = useReduxSelector(
		(state) => state.settings.editor,
	);
	const editor = useRef<HTMLInputElement>(null);

	const { code, lang } = cell;

	const extensions = useMemo(() => {
		const extensions = [editorBaseTheme, EditorView.lineWrapping];
		if (lang === CellLanguage.R) {
			extensions.push(StreamLanguage.define(r));
		} else if (lang === CellLanguage.PYTHON) {
			extensions.push(python());
		} else {
			extensions.push(sql());
		}

		return extensions;
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
		<div className="editor-wrapper relative">
			<div
				ref={editor}
				className={cn("rounded-[5px]", {
					"cell-pending": cell.pending,
					"border-2 border-green-400": cell.success,
					"border-2 border-red-700": cell.error,
				})}
			/>
			<SelectLanguage lang={cell.lang} id={id} />
		</div>
	);
}
