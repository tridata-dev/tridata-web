import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import CellList from "./components/CellList";
import "@/styles/tailwind.css";
import "@/styles/globals.css";
import Console from "./components/Console";
import SiteHeader from "./components/SiteHeader";
import { initREngine } from "@tridata/core/r";
import { initPythonEngine } from "@tridata/core/python";
import { Button } from "./components/ui/button";
import { useReduxActions } from "./hooks/redux";
import { CellLanguage } from "./lib/constants";

function App() {
	const { setPrompt, setEngine } = useReduxActions();
	const {
		data: rEngineLoaded,
		refetch: loadREngine,
		isFetching: isLoadingREngine,
	} = useQuery(
		["r_engine"],
		async () => {
			const { webR, prompt } = await initREngine();
			setEngine({ lang: CellLanguage.R, engine: webR });
			setPrompt({ lang: CellLanguage.R, prompt: prompt.trim() });
			return true;
		},
		{ enabled: false },
	);

	const {
		data: pythonEngineLoaded,
		refetch: loadPythonEngine,
		isFetching: isLoadingPythonEngine,
	} = useQuery(
		["python_engine"],
		async () => {
			const pyodide = await initPythonEngine();
			setEngine({ lang: CellLanguage.PYTHON, engine: pyodide });
			console.log(pyodide.version);
			return true;
		},
		{ enabled: false },
	);

	return (
		<section className="main">
			<SiteHeader />
			<section>
				<Button onClick={() => loadREngine()} disabled={isLoadingREngine}>
					{isLoadingREngine
						? "loading"
						: rEngineLoaded
						? "r engine loaded"
						: "init R engine"}
				</Button>

				<Button
					onClick={() => loadPythonEngine()}
					disabled={isLoadingPythonEngine}
				>
					{isLoadingPythonEngine
						? "loading"
						: pythonEngineLoaded
						? "python loaded"
						: "init Python engine"}
				</Button>
			</section>
			<CellList />
			<Console />
		</section>
	);
}

export default App;
