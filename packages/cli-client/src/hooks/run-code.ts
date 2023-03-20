import { useReduxDispatch } from "@/redux/store";
import { runCell as runCellThunk } from "@/redux/thunks/cells";
import { runCommand as runCommandThunk } from "@/redux/thunks/console";
import { TridataError } from "@tridata/core";
import { toast } from "sonner";
import { useEngine } from "./engines";
import { CellLanguage } from "@/lib/constants";

export const useRunCode = ({
	id,
	lang,
	type = "cell",
}: { id: string; lang: CellLanguage; type?: "cell" | "command" }) => {
	const dispatch = useReduxDispatch();
	const engine = useEngine({ lang });

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

		try {
			await dispatchResult.unwrap();
		} catch (err) {
			if (err instanceof TridataError) {
				toast(err.message);
			}
			console.log(err);
		}
	};

	return run;
};
