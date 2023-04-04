import { CellLanguages, CellLanguage } from "@/lib/constants";
import LanguageConsole from "./LanguageConsole";
import { useState } from "react";
import { cn } from "@/lib/utils";
export default function Console() {
	const [activePane, setActivePane] = useState<CellLanguage>(CellLanguage.R);

	return (
		<section className="console font-mono py-2 gap-4 flex">
			<div className="tabs flex flex-col gap-2 items-start">
				{CellLanguages.map((lang) => (
					<div
						className={cn("tab p-0 w-full", {
							"tab-active": activePane === lang,
						})}
						key={lang}
					>
						<button className="w-full" onClick={() => setActivePane(lang)}>
							{lang}
						</button>
					</div>
				))}
			</div>
			<div className="flex-1">
				<LanguageConsole lang={activePane} />
			</div>
		</section>
	);
}
