import { SQLCellResult } from "@/types";
import { SqlEngine } from "@tridata/core";

export const runSQL = async ({
	code,
	engine,
}: { code: string; engine: SqlEngine }) => {
	console.log("running SQL code", code);
	const sqlEngine = engine as SqlEngine;
	const q = await sqlEngine.query(code);
	const records = q.toArray();
	const schema = q.schema.fields.map((f) => ({
		name: f.name,
		type: String(f.type),
	}));
	const nrow = q.numRows;
	const ncol = q.numCols;
	const values = [];
	const nMax = Math.min(100, nrow);
	for (let i = 0; i < nMax; i++) {
		values.push(Object.values(records[i]));
	}
	const result = {
		nrow,
		ncol,
		schema,
		values,
	};
	return result;
};
