import { CellLanguage } from "@/lib/constants";
import Command from "./Command";
import { useReduxSelector } from "@/redux/store";
import { useState } from "react";

type Props = {
	lang: CellLanguage;
};

export default function LanguageConsole({ lang }: Props) {
	const { commands, orders, prompt } = useReduxSelector(
		(state) => state.console[lang],
	);

	const [clearPrompt, setClearPrompt] = useState(false);

	return (
		<section className="console-pane p-1 text-white text-sm font-mono">
			<pre className="console-prompt mb-4 whitespace-pre-wrap">
				{clearPrompt ? "" : prompt}
			</pre>
			{orders.map((id) => {
				const command = commands[id];
				return (
					<Command
						id={id}
						command={command}
						lang={lang}
						key={id}
						setClearPrompt={setClearPrompt}
					/>
				);
			})}
		</section>
	);
}
