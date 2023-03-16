import { REngine } from "@/types/store";

type ResultType = "stdout" | "plot";

type RResult = {
	type: string;
	data: string;
};

export const runRWithEngine = async (engine: REngine, code: string) => {
	engine.writeConsole(code + "\n");

	const results: RResult[] = [];
	let read = await engine.read();
	let currentResult = "";
	let currentType = read.type;
	while (currentType !== "prompt") {
		currentResult += read.data + "\n";
		read = await engine.read();
		if (
			read.type !== currentType ||
			(read.data as string).startsWith("clearRect")
		) {
			results.push({
				type: currentType,
				data: currentResult,
			});
			currentResult = "";
			currentType = read.type;
		}
	}

	console.log(results);

	return results;
};
