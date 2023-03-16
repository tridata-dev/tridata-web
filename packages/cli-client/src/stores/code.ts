import { SupportedLanguage } from "@/lib/constants";
import { getInitialCells } from "@/lib/mock";
import { generateId } from "@/lib/utils";
import {
	CodeStore,
	PYTHONEngine,
	REngine,
	RCellResult,
	RCellResultType,
	SQLEngine,
} from "@/types/store";
import { TridataError, TridataErrorName } from "@tridata/core";
import { map, action } from "nanostores";

export const codeStore = map<CodeStore>({
	REngine: null,
	PYTHONEngine: null,
	SQLEngine: null,
	RPrompt: "",
	...getInitialCells(),
});

export const setREngine = action(
	codeStore,
	"set_r_engine",
	(store, engine: REngine) => {
		store.setKey("REngine", engine);
	},
);

export const setRPrompt = action(
	codeStore,
	"set_r_prompt",
	(store, prompt: string) => {
		store.setKey("RPrompt", prompt);
	},
);

export const setPYTHONEngine = action(
	codeStore,
	"set_python_engine",
	(store, engine: PYTHONEngine) => {
		store.setKey("PYTHONEngine", engine);
	},
);

export const setSQLEngine = action(
	codeStore,
	"set_sql_engine",
	(store, engine: SQLEngine) => {
		store.setKey("SQLEngine", engine);
	},
);

export const insertCell = action(
	codeStore,
	"insert_cell",
	(store, options?: { afterId?: string }) => {
		const { cells, orders } = store.get();
		const lastLang =
			cells.get(orders[orders.length - 1])?.lang || SupportedLanguage.R;
		const { afterId } = options || {};
		const newCellId = generateId();
		store.setKey(
			"cells",
			new Map(
				cells.set(newCellId, {
					code: "",
					lang: lastLang,
					pending: false,
					results: [],
					success: undefined,
					error: undefined,
				}),
			),
		);
		let newOrders;
		if (afterId) {
			const index = orders.indexOf(afterId);
			if (index !== -1) {
				newOrders = [
					...orders.slice(0, index + 1),
					newCellId,
					...orders.slice(index + 1),
				];
			} else {
				newOrders = [...orders, newCellId];
			}
		} else {
			newOrders = [...orders, newCellId];
		}
		store.setKey("orders", newOrders);
	},
);

export const deleteCell = action(
	codeStore,
	"delete_cell",
	(store, id: string) => {
		const { cells, orders } = store.get();
		const newCells = new Map(cells);
		newCells.delete(id);
		const newOrders = orders.filter((order) => order !== id);
		store.setKey("cells", newCells);
		store.setKey("orders", newOrders);
	},
);

export const run = action(
	codeStore,
	"run_r",
	async (
		store,
		{ id, code, lang }: { id: string; code: string; lang: SupportedLanguage },
	) => {
		const oldStore = store.get();
		const { cells } = oldStore;
		const cell = cells.get(id);
		if (!cell) {
			return;
		}
		if (lang === "R") {
			const { REngine } = oldStore;
			if (!REngine) {
				throw new TridataError({
					name: TridataErrorName.WEBR_NOT_FOUND,
					message: "The R Engine is not initialized",
				});
			} else {
				console.log("running r code", code);
				REngine.writeConsole(code + "\n");

				let read = await REngine.read();
				let currentData = "";
				let currentType = read.type as RCellResultType;
				const results: RCellResult[] = [];
				const newCells = new Map(cells);
				while (currentType !== "prompt") {
					currentData += read.data + "\n";
					read = await REngine.read();
					if (read.type !== currentType || read.data.startsWith("clearRect")) {
						const result = {
							type: currentType,
							data: currentData,
						};
						results.push(result);
						// newCells.set(id, {
						// 	...cell,
						// 	results: [...cell.results, result],
						// });
						// store.setKey("cells", newCells);
						currentData = "";
						currentType = read.type as RCellResultType;
					}
				}
				newCells.set(id, {
					...cell,
					results,
				});
				store.setKey("cells", newCells);
				console.log(results);
			}
		}
	},
);
