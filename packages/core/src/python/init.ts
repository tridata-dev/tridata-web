import { loadPyodide } from "pyodide";

type PyodideOptions = Parameters<typeof loadPyodide>[0];
export const initPythonEngine = async (options?: PyodideOptions) => {
	const defaultOptions = {
		indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/",
	};
	return await loadPyodide(Object.assign(defaultOptions, options));
};
