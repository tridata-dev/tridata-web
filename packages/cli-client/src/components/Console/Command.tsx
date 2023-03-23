import { useEffect, useRef, useState } from "react";
import { CellLanguage } from "@/lib/constants";
import {} from "@/redux/slices/console";
import { Command as CommandType, RCellResult } from "@/types";
import { useReduxActions } from "@/hooks/redux";
import { useRunCode } from "@/hooks/run-code";
import SpinnerIcon from "../icons/Spinner";
import Results from "../Results";

type Props = {
	id: string;
	command: CommandType;
	lang: CellLanguage;
};

const prefixLookup: Record<CellLanguage, string> = {
	R: "r>",
	PYTHON: "py>",
	SQL: "sql>",
};

const autoCompletePairs: Record<string, string> = {
	"(": ")",
	"{": "}",
	"[": "]",
	"'": "'",
	'"': '"',
	"`": "`",
} as const;

export default function Command({ id, lang, command }: Props) {
	const [input, setInput] = useState(command.code);
	const { addCommand, updateCommand, clearPreviousCommands } =
		useReduxActions();
	const runCommand = useRunCode({ id, lang, type: "command" });
	const ref = useRef<HTMLTextAreaElement>(null);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.shiftKey && e.key === "Enter") {
			e.preventDefault();
			setInput((prev) => `${prev}\n`);
		}

		if (e.ctrlKey && e.key === "l") {
			e.preventDefault();
			clearPreviousCommands({ id, lang });
		}

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			updateCommand({ id, lang, code: input });
			runCommand();
		}

		if (e.key === "Tab") {
			e.preventDefault();
			setInput((prev) => `${prev}\t`);
		}

		if (e.key in autoCompletePairs) {
			if (ref.current) {
				const editor = ref.current;
				const start = editor.selectionStart;
				const end = editor.selectionEnd;
				editor.value = `${editor.value.slice(0, start)}${
					autoCompletePairs[e.key]
				}${editor.value.slice(start, editor.value.length)}`;
				editor.selectionStart = start;
				editor.selectionEnd = end;
			}
		}
	};

	useEffect(() => {
		if (input === "") {
			ref.current?.focus();
		}

		if (ref.current) {
			const el = ref.current;
			// We need to reset the height momentarily to get the correct scrollHeight for the textarea
			el.style.height = "0px";
			const scrollHeight = el.scrollHeight;

			// We then set the height directly, outside of the render loop
			// Trying to set this with state or a ref will product an incorrect value.
			el.style.height = `${scrollHeight}px`;
		}
	}, [input]);

	return (
		<section className="command">
			<div className="flex gap-2 pr-16 mt-2">
				{command.pending ? (
					<SpinnerIcon className="w-3 h-3" />
				) : (
					<span className=" text-blue-600">{prefixLookup[lang]}</span>
				)}

				<textarea
					className="flex-1 outline-none bg-black w-full inline-block overflow-hidden resize-none"
					ref={ref}
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					rows={5}
					onKeyDown={handleKeyDown}
				/>
			</div>
			{command.results && (
				// @ts-ignore
				<Results results={command.results} lang={lang} variant="command" />
			)}
		</section>
	);
}
