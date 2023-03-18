import { useReduxDispatch } from "@/redux/store";
import { runCode } from "@/redux/thunks/cells";
import { TridataError } from "@tridata/core";
import { toast } from "sonner";
import { useEngine } from "./engines";
import { CellLanguage } from "@/lib/constants";

export const useRunCell = ({
	id,
	lang,
}: { id: string; lang: CellLanguage }) => {
	const dispatch = useReduxDispatch();
	const engine = useEngine({ lang });

	const runCell = () => {
		if (!engine) {
			toast.error(
				`The \`${lang}\` engine is not initialized or has lost connection. Please load the engine again.`,
			);
			return;
		}

		dispatch(runCode({ id, engine }))
			.unwrap()
			.catch((err) => {
				if (err instanceof TridataError) {
					toast(err.message);
				}
			});
	};

	return runCell;
};
