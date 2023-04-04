import { useReduxDispatch, useReduxSelector } from "@/redux/store";
import { runCell as runCellThunk } from "@/redux/thunks/cells";
import { runCommand as runCommandThunk } from "@/redux/thunks/console";
import { TridataError } from "@tridata/core";
import { toast } from "sonner";
import { useEngine } from "./engines";
import { CellLanguage } from "@/lib/constants";
import { sleep } from "@/lib/utils";
import { useTaskActions } from "./tasks";
import { TaskType } from "@/contexts/tasks";
import { cellsActions } from "@/redux";
import { useContext } from "react";
import { PythonContext } from "@/contexts/python";
import { Engine } from "@/types";
import { EditorView, Command } from "@codemirror/view";
import { useReduxActions } from "./redux";

const taskTypes = {
	[CellLanguage.R]: TaskType.R_RUN,
	[CellLanguage.PYTHON]: TaskType.PYTHON_RUN,
	[CellLanguage.SQL]: TaskType.SQL_RUN,
};

export const useRunCode = ({
	id,
	lang,
	type = "cell",
}: { id: string; lang: CellLanguage; type?: "cell" | "command" }) => {
	const dispatch = useReduxDispatch();
	const engine = useEngine({ lang });
	const { addTask, removeTask } = useTaskActions();
	const run = async () => {
		if (!engine) {
			toast.error(
				`The \`${lang}\` engine is not initialized or has lost connection. Please load the engine again.`,
			);
			return;
		}

		let dispatchResult;
		if (type === "cell") {
			dispatchResult = dispatch(runCellThunk({ id, engine }));
		} else {
			dispatchResult = dispatch(runCommandThunk({ id, lang, engine }));
		}

		const result = dispatchResult.unwrap();
		const timeout = sleep(1000);
		const race = await Promise.race([result, timeout]);
		try {
			if (typeof race === "symbol") {
				// if timeout resolves first
				// code is still running, show loading indicator
				const taskType = taskTypes[lang];
				const id = addTask({ type: taskType });
				await result;
				removeTask(id);
			}
		} catch (err) {
			if (err instanceof TridataError) {
				toast(err.message);
			}
			console.log(err);
		}
	};

	return run;
};

export const useRunEditorSelection = () => {
	const { pushCell } = useReduxActions();
	const { activePane } = useReduxSelector((state) => state.editor);
	const runSelection: Command = (view: EditorView) => {
		// run selection in the editor
		// if no selection, run all the content before the cursor
		const { from, to, head } = view.state.selection.main;
		const selection = view.state.sliceDoc(from, to);
		if (selection) {
			pushCell({ lang: activePane, code: selection, autoExecute: true });
		} else {
			const { number, text } = view.state.doc.lineAt(head);
			// const codeBlock = [text]
			// while (number > 1) {
			// 	number--;
			// 	const line = view.state.doc.line(number)
			// 	console.log(line)
			// 	if (line.text.trim() === "") {
			// 		break
			// 	}
			// 	codeBlock.unshift(line.text)
			// }
			// const code = codeBlock.join("\n")
			pushCell({ lang: activePane, code: text, autoExecute: true });
		}
		return true;
	};
	return runSelection;
};
