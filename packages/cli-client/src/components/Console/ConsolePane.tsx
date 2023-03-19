import { CellLanguage } from "@/lib/constants";
import Command from "./Command";
import { useReduxSelector } from "@/redux/store";

type Props = {
	lang: CellLanguage;
};

export default function ConsolePane({ lang }: Props) {
	const { commands, orders, prompt } = useReduxSelector(
		(state) => state.console[lang],
	);

	return (
		<section className="console-pane">
			<pre className="console-prompt text-white text-sm">{prompt}</pre>
			{orders.map((id) => {
				const command = commands[id];
				return <Command id={id} command={command} lang={lang} key={id} />;
			})}
		</section>
	);
}
