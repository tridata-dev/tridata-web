import "@/styles/tailwind.css";
import "@/styles/globals.css";
import SiteHeader from "./components/SiteHeader";
import { Button } from "./components/ui/button";
import { CellLanguage } from "./lib/constants";
import { useInitEngine } from "./hooks/engines";
import SiteFooter from "./components/SiteFooter";
import { useContext, useEffect } from "react";
import { PythonContext } from "./contexts/python";
import ConsolePane from "./components/ConsolePane";
import Split from "@uiw/react-split";
import EditorPane from "./components/EditorPane";
import NotebookPane from "./components/NotebookPane";
import { useReduxSelector } from "./redux/store";
import { base64ToObj } from "./lib/utils";
import { useReduxActions } from "./hooks/redux";

function App() {
	const settings = useReduxSelector((state) => state.settings);
	const initEngine = useInitEngine();
	const { initPythonEngine } = useContext(PythonContext);
	const { setPaneCode } = useReduxActions();

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has("code")) {
			const code = searchParams.get("code") as string;
			try {
				const codeBlocks = base64ToObj(code);
				const { R: RCode, PYTHON: PythonCode, SQL: SQLCode } = codeBlocks;
				if (RCode.length > 0) {
					setPaneCode({ pane: CellLanguage.R, code: RCode.join("\n") });
				}
				if (PythonCode.length > 0) {
					setPaneCode({
						pane: CellLanguage.PYTHON,
						code: PythonCode.join("\n"),
					});
				}
				if (SQLCode.length > 0) {
					setPaneCode({ pane: CellLanguage.SQL, code: SQLCode.join("\n") });
				}
			} catch (e) {
				console.error(e);
			}
		}

		if (settings.R.autoInit) {
			initEngine({ lang: CellLanguage.R });
		}

		if (settings.PYTHON.autoInit) {
			initPythonEngine();
		}

		if (settings.SQL.autoInit) {
			initEngine({ lang: CellLanguage.SQL });
		}
	}, []);

	return (
		<main className="main relative min-w-screen min-h-screen">
			<SiteHeader />
			<section className="flex gap-2">
				<button
					className="btn btn-sm"
					onClick={() => initEngine({ lang: CellLanguage.R })}
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
					onClick={() => initEngine({ lang: CellLanguage.SQL })}
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
