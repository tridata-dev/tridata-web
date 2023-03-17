import { CellLanguage } from "@/lib/constants";
import ConsoleEntry from "./ConsoleEntry";
import { useReduxSelector } from "@/redux/store";

type Props = {
	lang: CellLanguage;
};

export default function ConsolePane({ lang }: Props) {
	const { prompts } = useReduxSelector((state) => state.cells);
	const languagePrompt = prompts[lang];

	return (
		<section className="console-pane">
			<pre className="console-prompt text-white text-sm">{languagePrompt}</pre>
			<ConsoleEntry lang={lang} />
		</section>
	);
}
