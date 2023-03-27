import "@/styles/tailwind.css";
import "@/styles/globals.css";
import SiteHeader from "./components/SiteHeader";
import { Button } from "./components/ui/button";
import { CellLanguage } from "./lib/constants";
import { useSetEngine } from "./hooks/engines";
import SiteFooter from "./components/SiteFooter";
import { useContext } from "react";
import { PythonContext } from "./contexts/python";
import ConsolePane from "./components/ConsolePane";
import Split from "@uiw/react-split";
import EditorPane from "./components/EditorPane";
import NotebookPane from "./components/NotebookPane";

function App() {
	const { setEngine } = useSetEngine();
	const { initPythonEngine } = useContext(PythonContext);

	return (
		<main className="main relative min-w-screen min-h-screen">
			<SiteHeader />
			<section className="flex gap-2">
				<button
					className="btn btn-sm"
					onClick={() => setEngine({ lang: CellLanguage.R })}
				>
					init R engine
				</button>

				<button
					className="btn btn-sm"
					onClick={async () => {
						await initPythonEngine();
					}}
				>
					init Python engine
				</button>

				<button
					onClick={() => setEngine({ lang: CellLanguage.SQL })}
					className="btn btn-sm"
				>
					init SQL engine
				</button>
			</section>
			<Split className="min-w-screen min-h-screen">
				<Split mode="vertical">
					<EditorPane />
					<ConsolePane />
				</Split>
				<NotebookPane />
			</Split>
			<SiteFooter />
		</main>
	);
}

export default App;
