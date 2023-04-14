import { CellLanguage } from "@/lib/constants";
import Command from "./Command";
import { useReduxSelector } from "@/redux/store";
import { useContext, useState } from "react";
import { PythonContext } from "@/contexts/python";
import { useEngine, useInitEngine } from "@/hooks/engines";
import { useTaskActions } from "@/hooks/tasks";
import { TaskType } from "@/contexts/tasks";

type Props = {
	lang: CellLanguage;
};

export default function LanguageConsole({ lang }: Props) {
	const { engine, pending, initEngineFunc } = useEngine({ lang });
	const [disabled, setDisabled] = useState(false);

	const hanldeInit = async () => {
		setDisabled(true);
		await initEngineFunc();
		setDisabled(false);
	};

	const buttonLoading = disabled || pending;

	const { commands, orders, prompt } = useReduxSelector(
		(state) => state.console[lang],
	);

	const [clearPrompt, setClearPrompt] = useState(false);

	return (
		<section className="console-pane p-1 text-white text-sm font-mono">
			{engine ? (
				lang !== CellLanguage.SQL ? (
					<pre className="console-prompt mb-4 whitespace-pre-wrap">
						{clearPrompt ? "" : prompt}
					</pre>
				) : (
					<pre className="console-prompt mb-4 whitespace-pre-wrap">
						<p>SQL (duckdb)</p>
						<p>See https://duckdb.org/docs/ for available commands. Example:</p>
						<br />
						<p className="text-base-content/50 text-sm">
							SELECT * FROM
							read_csv_auto("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv")
						</p>
					</pre>
				)
			) : (
				<button
					className="btn btn-outline btn-sm btn-secondary"
					onClick={() => hanldeInit()}
					disabled={buttonLoading}
				>
					{buttonLoading ? "Initializing ..." : "Initialize"}
				</button>
			)}
			{orders.map((id) => {
				const command = commands[id];
				return (
					<Command
						id={id}
						command={command}
						lang={lang}
						key={id}
						setClearPrompt={setClearPrompt}
					/>
				);
			})}
		</section>
	);
}
