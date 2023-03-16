import { SupportedLanguage } from "@/lib/constants";
import ConsoleEntry from "./ConsoleEntry";
import { useEffect, useRef } from "react";

type Props = {
	lang: SupportedLanguage;
};

export default function ConsolePane({ lang }: Props) {
	return (
		<section className="console-pane">
			<ConsoleEntry lang={lang} />
		</section>
	);
}
