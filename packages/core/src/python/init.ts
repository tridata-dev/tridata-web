import { loadPyodide } from "pyodide";

export const initPythonEngine = async (
	options?: Parameters<typeof loadPyodide>[0],
) => {
	const indexURL = "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/";
	return await loadPyodide({ indexURL, ...options });
};
