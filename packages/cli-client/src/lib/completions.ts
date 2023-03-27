import { snippet, snippetCompletion } from "@codemirror/autocomplete";

export const rCompletions = [
	snippetCompletion("library(${})", {
		label: "library",
		detail: "load a package",
		type: "function",
	}),
	snippetCompletion('webr::install("${}")', {
		label: "install.packages",
		detail: "install R package in the browser",
		type: "keyword",
	}),
	snippetCompletion('webr::install("${}")', {
		label: "webr::install",
		detail: "install R package in the browser",
		type: "keyword",
	}),
	snippetCompletion("for (${name} in ${collection}) {\n}", {
		label: "for",
		detail: "fo loop",
		type: "keyword",
	}),
	{
		label: "|>",
		type: "function",
		info: "native pipe operator",
	},
	{
		label: "%>%",
		type: "function",
		info: "pipe operator from the magrittr package",
	},
];

export const pythonCompletions = [
	snippetCompletion("show_matplotlib(${plt})", {
		label: "show_matplotlib",
		type: "function",
		info: "helper to print matplotlib plots",
	}),
	snippetCompletion("${plt}.show()\nshow_matplotlib(${plt})", {
		label: "plt.show()",
		type: "function",
		info: "helper to print matplotlib plots",
	}),
];

export const sqlCompletions = [
	snippetCompletion('read_csv_auto("${}")', {
		label: "read_csv_auto",
		type: "function",
		info: "read csv file with automatic type inference",
	}),
	snippetCompletion('read_csv("${}")', {
		label: "read_csv",
		type: "function",
		info: "read csv file",
	}),
	snippetCompletion('read_parquet("${}")', {
		label: "read_parquet",
		type: "function",
		info: "read parquet file",
	}),
	snippetCompletion('read_json("${}")', {
		label: "read_json",
		type: "function",
		info: "read json file",
	}),
];
