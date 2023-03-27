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
		<main className="main relative w-screen h-screen">
			<SiteHeader />

			<Split className="w-full h-full ">
				<Split mode="vertical" style={{ width: "50%" }}>
					<EditorPane />
					<ConsolePane />
				</Split>
				<NotebookPane />
			</Split>
			<SiteFooter />
			<section className="flex gap-2">
				<Button onClick={() => setEngine({ lang: CellLanguage.R })}>
					init R engine
				</Button>

				<Button
					onClick={async () => {
						await initPythonEngine();
					}}
				>
					init Python engine
				</Button>

				<Button onClick={() => setEngine({ lang: CellLanguage.SQL })}>
					init SQL engine
				</Button>
			</section>
		</main>
	);
}

export default App;
