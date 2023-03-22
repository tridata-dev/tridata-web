import { expose } from "comlink";
import { initPythonEngine } from "@tridata/core/python";
import type { PyProxy, PyodideInterface, micropip } from "@tridata/core";

declare global {
	interface Window {
		pyodide: PyodideInterface;
		micropip: micropip;
	}
}

const initConsoleCode = `
from pyodide.console import PyodideConsole, repr_shorten, BANNER
`;

type PyodideResult = PyProxy | number | string | undefined;

const python = {
	async init() {
		self.pyodide = await initPythonEngine();
		await self.pyodide.loadPackage(["micropip"]);
		self.micropip = self.pyodide.pyimport("micropip") as unknown as micropip;
		const namespace = self.pyodide.globals.get("dict")();
		await self.pyodide.runPythonAsync(initConsoleCode, { globals: namespace });
		const banner = namespace.get("BANNER");
		namespace.destroy();
		return banner;
	},
	async run(code: string) {
		const result: PyodideResult = await self.pyodide.runPythonAsync(code);
		if (typeof result === "object") {
			return result.toJs();
		}
		return result;
	},
	async installPackages(packages: string[]) {
		return self.micropip.install(packages);
	},
	async loadedPackages() {
		return self.pyodide.loadedPackages;
	},
};

export type PythonWorker = typeof python;

expose(python);
