import CellList from "./components/CellList";
import "@/styles/tailwind.css";
import "@/styles/globals.css";
import Console from "./components/Console";
import SiteHeader from "./components/SiteHeader";
import { Button } from "./components/ui/button";
import { CellLanguage } from "./lib/constants";
import { useSetEngine } from "./hooks/engines";

function App() {
	const setEngine = useSetEngine();

	return (
		<section className="main">
			<SiteHeader />
			<section>
				<Button onClick={() => setEngine({ lang: CellLanguage.R })}>
					init R engine
				</Button>
			</section>
			<CellList />
			<Console />
		</section>
	);
}

export default App;
