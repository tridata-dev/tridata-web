import { CellLanguage } from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { useCodeMirror } from "@uiw/react-codemirror";
import { Cell as CellType } from "@/types/store";
import Result from "../Result";
import React from "react";
import { cn } from "@/lib/utils";
import { useReduxActions } from "@/hooks/redux";
import { useReduxDispatch, useReduxSelector } from "@/redux/store";
import { runCode } from "@/redux/thunks/cells";
import { TridataError } from "@tridata/core";
import { toast } from "sonner";
import PlusIcon from "../icons/Plus";
import EllipsisIcon from "../icons/Ellipsis";
import CellControl from "./CellControl";
import LanguageSelect from "./LanguageSelect";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { insertCell, deleteCell, setCellCode } = useReduxActions();
	const dispatch = useReduxDispatch();
	const { theme, lineNumbers } = useReduxSelector((store) => store.editor);

	const { code, lang, results } = cell;
	const editor = useRef<HTMLInputElement>(null);
	const extensions = useMemo(() => {
		return [StreamLanguage.define(r)];
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

	const handleExecute = async () => {
		dispatch(runCode({ id }))
			.unwrap()
			.catch((err) => {
				if (err instanceof TridataError) {
					toast(err.message);
				}
			});
	};

	return (
		<section className="cell my-4 group">
			{/* <LanguageSelect /> */}
			<div className="flex px-1 py-4">
				<CellControl id={id} />
				<div className="cell-main flex-1">
					<div
						ref={editor}
						className={cn("relative", {
							"cell-pending": cell.pending,
							"border-2 border-green-400": cell.success,
							"border-2 border-red-700": cell.error,
						})}
					/>
					<div className="flex gap-1">
						<Button onClick={() => insertCell({ afterId: id })}>
							add cell
						</Button>
						<Button onClick={() => deleteCell({ id })}>delete cell</Button>
						<Button onClick={() => handleExecute()} className="ml-auto">
							run code
						</Button>
					</div>

					{results.map((result, i) => {
						// if (result.type === "canvasExec") {
						// 	return (
						// 		<RCanvas
						// 			drawCanvasCode={result.data}
						// 			key={`cell-${id}-result-${i}`}
						// 		/>
						// 	);
						// } else {
						// 	<Result data={{ lang, result }} key={`cell-${id}-result-${i}`} />;
						// }
						return (
							<Result
								data={{ lang: cell.lang, result }}
								key={`cell-${id}-result-${i}`}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default React.memo(Cell);
