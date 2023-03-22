import { PythonCellResult } from "@/types";
import { PythonEngine } from "@tridata/core";

type PythonError = {
	name: "PythonError";
	stack: string;
};

const shortenPythonErrorStack = (text: string) => {
	return text.replace(/\s*at.+$/gm, "");
};

export const runPython = async ({
	code,
	engine,
}: { code: string; engine: PythonEngine }): Promise<PythonCellResult> => {
	console.log("running Python code", code);
	try {
		let result = await engine.runPython(code);
		if (result instanceof Map) {
			result = Object.fromEntries(result);
		}
		return { type: "stdout", data: result };
	} catch (err: unknown) {
		console.log("error in lib.runPython", err);
		if (typeof err === "object") {
			const pythonError = err as PythonError;
			return {
				type: "stderr",
				data: shortenPythonErrorStack(pythonError.stack),
			};
		} else {
			return { type: "stderr", data: err as string };
		}
	}
};
