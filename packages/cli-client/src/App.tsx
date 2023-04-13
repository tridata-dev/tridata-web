import "@/styles/tailwind.css";
import "@/styles/globals.css";
import SiteHeader from "./components/SiteHeader";
import { CellLanguage } from "./lib/constants";
import { useInitEngine } from "./hooks/engines";
import SiteFooter from "./components/SiteFooter";
import { useContext, useEffect } from "react";
import { PythonContext } from "./contexts/python";
import EditorPane from "./components/EditorPane";
import NotebookPane from "./components/NotebookPane";
import { useReduxSelector } from "./redux/store";
import { base64ToObj } from "./lib/utils";
import { useReduxActions } from "./hooks/redux";
import ToolsPane from "./components/ToolsPane";
import Split from "@uiw/react-split";
import React from "react";

const Demo = () => (
	<Split style={{ height: 200, border: "1px solid #d5d5d5", borderRadius: 3 }}>
		<Split mode="vertical">
			<div style={{ height: "50%" }}>Top Pane</div>
			<Split style={{ height: "50%" }}>
				<div>Left Pane</div>
				<div style={{ flex: 1 }}>Right Pane</div>
			</Split>
		</Split>
		<div style={{ flex: 1 }}>Right Pane</div>
	</Split>
);

function App() {
	const settings = useReduxSelector((state) => state.settings);
	const initEngine = useInitEngine();
	const { initPythonEngine } = useContext(PythonContext);
	const { setPaneCode, switchPane } = useReduxActions();

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has("code")) {
			const code = searchParams.get("code") as string;
			try {
				const codeBlocks = base64ToObj(code);
				const { R: RCode, PYTHON: PythonCode, SQL: SQLCode } = codeBlocks;
				if (RCode.length > 0) {
					setPaneCode({ pane: CellLanguage.R, code: RCode });
					initEngine({ lang: CellLanguage.R });
					switchPane(CellLanguage.R);
				}
				if (PythonCode.length > 0) {
					setPaneCode({
						pane: CellLanguage.PYTHON,
						code: PythonCode,
					});
					switchPane(CellLanguage.PYTHON);
					initPythonEngine();
				}
				if (SQLCode.length > 0) {
					setPaneCode({ pane: CellLanguage.SQL, code: SQLCode });
					switchPane(CellLanguage.SQL);
					initEngine({ lang: CellLanguage.SQL });
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
		<main className="main relative min-w-screen">
			<SiteHeader />
			<Split>
				<div style={{ width: "50%", minWidth: "40%" }} className="min-h-screen">
					<EditorPane />
					<ToolsPane />
				</div>
				<div style={{ width: "50%", minWidth: "20%" }}>
					<NotebookPane />
				</div>
			</Split>
			<SiteFooter />
		</main>
	);
}

export default App;
