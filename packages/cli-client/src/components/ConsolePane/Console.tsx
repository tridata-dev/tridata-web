import { CellLanguages, CellLanguage } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsolePane from "./LanguageConsole";
import { useLocalStorage } from "@/hooks/local-storage";
export default function Console() {
	const [activePane, setActivePane] = useLocalStorage<CellLanguage>(
		"tridata-console-pane",
		CellLanguage.R,
	);

	return (
		<Tabs defaultValue={activePane} className="w-full">
			<TabsList>
				{CellLanguages.map((lang) => (
					<TabsTrigger
						value={lang}
						key={`tab-${lang}`}
						onClick={() => setActivePane(lang)}
					>
						{lang}
					</TabsTrigger>
				))}
			</TabsList>
			<div className="font-mono px-2 rounded-md bg-black">
				{CellLanguages.map((lang) => (
					<TabsContent
						value={lang}
						key={`tab-content-${lang}`}
						className="border-none py-2"
					>
						<ConsolePane lang={lang} />
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
}
