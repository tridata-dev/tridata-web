import { useReduxActions } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { useReduxSelector } from "@/redux/store";
import { Cell } from "@/types/store";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useEffect, useMemo, useRef } from "react";
import { EditorView } from "@codemirror/view";
import ChevronDown from "../icons/ChevronDown";

const editorBaseTheme = EditorView.baseTheme({
	".cm-content": {
		fontFamily: "Fira Code, monospace",
		fontSize: "14px",
		padding: "3px",
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
	const { theme, lineNumbers } = useReduxSelector((store) => store.editor);
	const editor = useRef<HTMLInputElement>(null);

	const { code, lang } = cell;

	const extensions = useMemo(() => {
		return [StreamLanguage.define(r), editorBaseTheme];
	}, [cell.lang]);

	const { setContainer } = useCodeMirror({
		container: editor.current,
		extensions,
		value: code,
		theme,
		onChange: (code) => setCellCode({ id, code }),
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
				className={cn("relative", {
					"cell-pending": cell.pending,
					"border-2 border-green-400": cell.success,
					"border-2 border-red-700": cell.error,
				})}
			/>
			<div className="absolute right-[1%] top-[1%] text-white text-sm tracking-tighter flex bg-indigo-100 rounded items-center px-2 py-0.5 ">
				<span className="inline-flex items-center  text-xs font-medium text-indigo-800">
					{lang}
				</span>
				<ChevronDown className="w-5 h-5 fill-black" />
			</div>
		</div>
	);
}
