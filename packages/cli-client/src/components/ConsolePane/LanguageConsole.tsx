import { CellLanguage } from "@/lib/constants";
import Command from "./Command";
import { useReduxSelector } from "@/redux/store";

type Props = {
	lang: CellLanguage;
};

export default function LanguageConsole({ lang }: Props) {
	const { commands, orders, prompt } = useReduxSelector(
		(state) => state.console[lang],
	);

	return (
		<section className="console-pane text-white text-sm font-mono">
			<pre className="console-prompt mb-4">{prompt}</pre>
			{orders.map((id) => {
				const command = commands[id];
				return <Command id={id} command={command} lang={lang} key={id} />;
			})}
		</section>
	);
}
