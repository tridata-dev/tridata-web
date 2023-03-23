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

const setUpCode = `
import js
class Placeholder:
    def __init__(self, *args, **kwargs) -> None:
        return
    def __getattr__(self, __name: str):
        return Placeholder
js.document = Placeholder()
def show_matplotlib(plt):
    import base64
    import io

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    img_str = "data:image/png;base64," + base64.b64encode(buf.read()).decode("UTF-8")
    buf.close()
    return img_str
`;

type PyodideResult = PyProxy | number | string | undefined;

const python = {
	async init() {
		self.pyodide = await initPythonEngine();
		await self.pyodide.runPythonAsync(setUpCode);
		await self.pyodide.loadPackage(["micropip"]);
		self.micropip = self.pyodide.pyimport("micropip") as unknown as micropip;

		// patch http requests
		await self.pyodide.loadPackage(["pyodide-http"]);
		const pyodide_http = self.pyodide.pyimport("pyodide_http");
		pyodide_http.patch_all();

		// read prompt for console
		const namespace = self.pyodide.globals.get("dict")();
		await self.pyodide.runPythonAsync(initConsoleCode, { globals: namespace });
		const banner = namespace.get("BANNER");
		namespace.destroy();
		return banner;
	},
	async run(code: string) {
		const result: PyodideResult = await self.pyodide.runPythonAsync(code);
		console.log("result in python worker", result);
		if (self.pyodide.isPyProxy(result)) {
			return String(result);
		}
		return result ? String(result) : "";
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
