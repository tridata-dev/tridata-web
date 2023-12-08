import { RCellResult, RCellResultType } from "@/types";
import type { REngine } from "@tridata/core";

export const runR = async ({
	code,
	engine,
}: { code: string; engine: REngine }) => {
	console.log("running R code", code);
	engine.writeConsole(`${code}\n`);
	let read = await engine.read();
	let currentType = read.type as RCellResultType;
	let currentData = read.data;
	const results: RCellResult[] = [];

	while (currentType !== "prompt") {
		const images = [];

		// Process all canvas types
		while (currentType === "canvas") {
			if (currentData.image) {
				images.push(currentData.image);
			}
			read = await engine.read();
			currentType = read.type as RCellResultType;
			currentData = read.data;
		}

		// If there were any images, add them to results
		if (images.length > 0) {
			results.push({
				type: "canvas",
				data: images,
			});
		}

		// Process non-canvas types
		if (currentType !== "prompt") {
			const result = {
				type: currentType,
				data: `${currentData}\n`,
			};
			results.push(result);

			read = await engine.read();
			currentType = read.type as RCellResultType;
			currentData = read.data;
		}
	}

	return results;
};
