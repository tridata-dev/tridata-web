import { CellLanguages } from "@/lib/constants";
import CodeEditor from "./CodeEditor";
import { useReduxSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { useReduxActions } from "@/hooks/redux";
import { useEffect } from "react";

export default function EditorPane() {
	const activePane = useReduxSelector((state) => state.editor.activePane);
	const { switchPane } = useReduxActions();

	useEffect(() => {
		console.log("activePane is", activePane);
	}, [activePane]);

	return (
		<section style={{ height: "50%" }}>
			<header className="rounded-t-md">
				<div className="tabs gap-2 font-mono">
					{CellLanguages.map((lang) => (
						<button
							className={cn("tab tab-bordered w-16 px-2", {
								"tab-active": lang === activePane,
							})}
							key={lang}
							onClick={() => {
								switchPane(lang);
							}}
						>
							{lang}
						</button>
					))}
				</div>
			</header>
			<CodeEditor />
		</section>
	);
}
