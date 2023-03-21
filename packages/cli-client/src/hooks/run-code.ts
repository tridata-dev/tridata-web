import { useReduxDispatch } from "@/redux/store";
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
				const id = addTask(taskType);
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
