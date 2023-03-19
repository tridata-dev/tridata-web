import { WebR } from "@r-wasm/webr";

export const initREngine = async () => {
	const webR = new WebR({
		REnv: {
			R_HOME: "/usr/lib/R",
			R_ENABLE_JIT: "0",
			R_DEFAULT_DEVICE: "canvas",
		},
		SW_URL: "/webr",
	});

	await webR.init();
	let prompt = "";
	let read = await webR.read();
	while (read.type !== "prompt") {
		prompt += "\n" + read.data;
		read = await webR.read();
	}

	return {
		webR,
		prompt,
	};
};
