import type { AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";
import type { WebR } from "@r-wasm/webr";
import type { PyodideInterface } from "pyodide";

export type REngine = WebR;
export type PythonEngine = PyodideInterface;
export type SqlEngine = AsyncDuckDBConnection;
export type Engine = REngine | PythonEngine | SqlEngine;
