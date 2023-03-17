import { useReduxDispatch } from "@/redux/store";
import { runCode } from "@/redux/thunks/cells";
import { TridataError } from "@tridata/core";
import { toast } from "sonner";

export const useRunCell = () => {
	const dispatch = useReduxDispatch();
	const runCell = ({ id }: { id: string }) => {
		dispatch(runCode({ id }))
			.unwrap()
			.catch((err) => {
				if (err instanceof TridataError) {
					toast(err.message);
				}
			});
	};

	return runCell;
};
