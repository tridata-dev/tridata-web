import { deleteCell, insertCell, run } from "@/stores/code";
import LanguageSelect from "./LanguageSelect";
import { SupportedLanguage } from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useEditorSettings } from "@/hooks/context";
import { Cell as CellType } from "@/types/store";
import { TridataError, TridataErrorName } from "@tridata/core";
import { toast } from "sonner";
import RResult from "@/components/Result/RResult";
import Result from "../Result";
import RCanvas from "../Result/RCanvas";

interface Props {
	cell: CellType;
	id: string;
}

export default function Cell({ cell, id }: Props) {
	const { code, lang: initialLang, results } = cell;
	const [input, setInput] = useState(code || "");
	const [lang, setLang] = useState<SupportedLanguage>(initialLang);
	const { theme } = useEditorSettings();
	const editor = useRef<HTMLInputElement>(null);
	const extensions = useMemo(() => {
		return [StreamLanguage.define(r)];
	}, [lang]);
	const { setContainer } = useCodeMirror({
		container: editor.current,
		extensions,
		value: code,
		theme,
		onChange: (val) => setInput(val),
	});

	useEffect(() => {
		if (editor.current) {
			setContainer(editor.current);
		}
	}, [editor.current]);

	const handleExecute = async () => {
		try {
			await run({ id, code: input, lang });
		} catch (error) {
			if (
				error instanceof TridataError &&
				error.name === TridataErrorName.WEBR_NOT_FOUND
			) {
				toast.error(error.message);
			}
		}
	};

	return (
		<section className="cell my-8">
			<LanguageSelect setLang={setLang} />
			<div ref={editor} />

			<div className="flex gap-1">
				<Button onClick={() => insertCell({ afterId: id })}>add cell</Button>
				<Button onClick={() => deleteCell(id)}>delete cell</Button>
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
					<Result data={{ lang, result }} key={`cell-${id}-result-${i}`} />
				);
			})}
		</section>
	);
}
