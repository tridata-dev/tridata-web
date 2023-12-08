import type { AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";
import type { WebR } from "webr";
export interface micropip {
	install: (packages: string[]) => Promise<void>;
}
export type REngine = WebR;
export type PythonEngine = {
	runPython: (code: string) => Promise<any>;
};
export type { PyodideInterface, PyProxy } from "pyodide";
export type SqlEngine = AsyncDuckDBConnection;
export type Engine = REngine | PythonEngine | SqlEngine;
