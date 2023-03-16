import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { r } from "@codemirror/legacy-modes/mode/r";
import React, { useState } from "react";
import { useEditorSettings } from "@/hooks/context";
import { Button } from "../ui/button";
import { deleteCell, insertCell, runR } from "@/stores/code";
import { SupportedLanguage } from "@/lib/constants";

interface Props {
	code?: string;
	id: string;
	lang: SupportedLanguage;
}

function Editor({ code, id, lang }: Props) {
	const [input, setInput] = useState(code || "");
	const { theme } = useEditorSettings();

	const handleExecute = () => {
		runR({ id, code: input });
	};

	return (
		<div>
			<CodeMirror
				value={input}
				onChange={() => setInput(input)}
				extensions={[StreamLanguage.define(r)]}
				theme={theme}
			/>
			<div className="flex gap-1">
				<Button onClick={() => insertCell({ afterId: id })}>add cell</Button>
				<Button onClick={() => deleteCell(id)}>delete cell</Button>
				<Button onClick={() => handleExecute()} className="ml-auto">
					run code
				</Button>
			</div>
		</div>
	);
}

export default React.memo(Editor);
