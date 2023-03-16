import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import CellList from "./components/CellList";
import "@/styles/tailwind.css";
import "@/styles/globals.css";
import Console from "./components/Console";
import SiteHeader from "./components/SiteHeader";
import { initWebR } from "@tridata/core/r";
import { setREngine, setRPrompt } from "@/stores/code";
import { Button } from "./components/ui/button";

function App() {
	const {
		data: webR,
		isLoading,
		refetch: loadWebR,
		isFetching,
	} = useQuery(
		["webr"],
		async () => {
			const { webR, prompt } = await initWebR();
			setREngine(webR);
			setRPrompt(prompt);
			return true;
		},
		{ enabled: false },
	);

	return (
		<section className="main">
			<SiteHeader />
			<section>
				<Button onClick={() => loadWebR()}>
					{isFetching ? "loading" : webR ? "webR loaded" : "init webR"}
				</Button>
			</section>
			<CellList />
			<Console />
		</section>
	);
}

export default App;
