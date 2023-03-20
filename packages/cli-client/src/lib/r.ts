import { RCellResult, RCellResultType } from "@/types";
import type { REngine } from "@tridata/core";

type RResult = {
	type: string;
	data: string;
};

export const runR = async ({
	code,
	engine,
}: { code: string; engine: REngine }) => {
	console.log("running R code", code);
	engine.writeConsole(code + "\n");

	let read = await engine.read();
	let currentData = "";
	let currentType = read.type as RCellResultType;
	const results: RCellResult[] = [];
	while (currentType !== "prompt") {
		currentData += read.data + "\n";
		read = await engine.read();
		if (read.type !== currentType || read.data.startsWith("clearRect")) {
			const result = {
				type: currentType,
				data: currentData,
			};
			results.push(result);
			currentData = "";
			currentType = read.type as RCellResultType;
		}
	}
	return results;
};
