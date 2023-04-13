import { useEffect, useRef, useState } from "react";
import { CellLanguage } from "@/lib/constants";
import {} from "@/redux/slices/console";
import { Command as CommandType, RCellResult } from "@/types";
import { useReduxActions } from "@/hooks/redux";
import { useRunCode } from "@/hooks/run-code";
import SpinnerIcon from "../icons/Spinner";
import Results from "../Results";
import { useReduxSelector } from "@/redux/store";

type Props = {
	id: string;
	command: CommandType;
	lang: CellLanguage;
	setClearPrompt: (clear: boolean) => void;
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

export default function Command({ id, lang, command, setClearPrompt }: Props) {
	const [input, setInput] = useState(command.code);
	const { updateCommand, clearPreviousCommands } = useReduxActions();
	const { commands, orders } = useReduxSelector((state) => state.console[lang]);
	const [pos, setPos] = useState(() =>
		orders.findIndex((order) => order === id),
	);
	const runCommand = useRunCode({ id, lang, type: "command" });
	const ref = useRef<HTMLTextAreaElement>(null);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.shiftKey && e.key === "Enter") {
			e.preventDefault();
			setInput((prev) => `${prev}\n`);
		}

		if (e.key === "ArrowUp") {
			if (pos > 0) {
				setPos((prev) => prev - 1);
				setInput(commands[orders[pos - 1]].code);
			}
		}

		if (e.ctrlKey && e.key === "l") {
			e.preventDefault();
			clearPreviousCommands({ id, lang });
			setClearPrompt(true);
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
		ref.current?.focus();
	}, []);

	useEffect(() => {
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
					className="flex-1 bg-base-100 outline-none w-full inline-block overflow-hidden resize-none"
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
