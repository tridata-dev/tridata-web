import CellList from "./components/CellList";
import "@/styles/tailwind.css";
import "@/styles/globals.css";
import Console from "./components/Console";
import SiteHeader from "./components/SiteHeader";
import { Button } from "./components/ui/button";
import { CellLanguage } from "./lib/constants";
import { useSetEngine } from "./hooks/engines";
import { useEffect } from "react";

function App() {
	const setEngine = useSetEngine();

	return (
		<section className="main">
			<SiteHeader />
			<section className="flex gap-2">
				<Button onClick={() => setEngine({ lang: CellLanguage.R })}>
					init R engine
				</Button>

				<Button onClick={() => setEngine({ lang: CellLanguage.SQL })}>
					init SQL engine
				</Button>
			</section>
			<CellList />
			<Console />
		</section>
	);
}

export default App;
