import { CellLanguages, CellLanguage } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsolePane from "./ConsolePane";
import { useLocalStorage } from "@/hooks/local-storage";
export default function Console() {
	const [activePane, setActivePane] = useLocalStorage<CellLanguage>(
		"tridata-console-pane",
		CellLanguage.R,
	);

	return (
		<div className="relative mt-2 flex-1 px-4 sm:px-6">
			<Tabs defaultValue={activePane} className="max-w-3xl mx-auto">
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
				{CellLanguages.map((lang) => (
					<TabsContent
						value={lang}
						key={`tab-content-${lang}`}
						className="border-none px-0 py-2"
					>
						<ConsolePane lang={lang} />
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
