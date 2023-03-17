import { useEffect, useRef, useState } from "react";
import { CellLanguage } from "@/lib/constants";

type Props = {
	lang: CellLanguage;
};

const prefixLookup: Record<CellLanguage, string> = {
	PYTHON: "py>",
	R: "r>",
	SQL: "sql>",
};

export default function ConsoleEntry({ lang }: Props) {
	const [input, setInput] = useState("");
	const ref = useRef<HTMLTextAreaElement>(null);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.shiftKey && e.key === "Enter") {
			e.preventDefault();
			setInput((prev) => `${prev}\n`);
		}

		if (e.key === "Tab") {
			e.preventDefault();
			setInput((prev) => `${prev}\t`);
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
		<section className="text-sm font-mono text-white">
			<div className="flex gap-2 pr-16 mt-8">
				<span className=" text-blue-600">{prefixLookup[lang]}</span>

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
		</section>
	);
}
