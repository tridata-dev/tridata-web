import { WebR, WebROptions } from "webr";

export const initREngine = async (options?: WebROptions) => {
	const defaultOptions = {
		REnv: {
			R_HOME: "/usr/lib/R",
			R_ENABLE_JIT: "0",
		},
		SW_URL: "/",
	};
	const webR = new WebR(Object.assign(defaultOptions, options));

	await webR.init();
	await webR.evalRVoid("options(device=webr::canvas)");

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
