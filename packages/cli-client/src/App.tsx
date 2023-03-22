import CellList from "./components/CellList";
import "@/styles/tailwind.css";
import "@/styles/globals.css";
import Console from "./components/Console";
import SiteHeader from "./components/SiteHeader";
import { Button } from "./components/ui/button";
import { CellLanguage } from "./lib/constants";
import { useSetEngine } from "./hooks/engines";
import SiteFooter from "./components/SiteFooter";
import { initPythonEngine } from "@tridata/core/python";
import { useContext } from "react";
import PythonProvider, { PythonContext } from "./contexts/python";

function App() {
	const { setEngine, setEngineDispatch } = useSetEngine();
	const { initPythonEngine, pythonEngine } = useContext(PythonContext);

	return (
		<section className="main relative">
			<SiteHeader />
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
			<CellList />
			<Console />
			<SiteFooter />
		</section>
	);
}

export default App;
