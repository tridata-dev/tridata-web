import { CellLanguage } from "@/lib/constants";
import type {
	CodeResults,
	PythonCellResult,
	RCellResult,
	ResultVariant,
	SQLCellResult,
} from "@/types";
import RResult from "./RResult";
import SQLResult from "./SQLResult";
import { cn } from "@/lib/utils";
import PythonResult from "./PythonResult";

type Props = {
	results: CodeResults;
	lang: CellLanguage;
	variant: ResultVariant;
};

export default function Results({ results, lang, variant }: Props) {
	const isCell = variant === "cell";
	const classes = cn(
		"text-sm",
		{ "cell-result my-2": isCell },
		{ "console-result my-1": !isCell },
	);

	if (lang === CellLanguage.R) {
		return (results as RCellResult[]).map((result, i) => (
			<div className={classes} key={`r-result-${i}`}>
				<RResult result={result} variant={variant} />
			</div>
		));
	}

	if (lang === CellLanguage.PYTHON) {
		return (
			<div className={classes}>
				<PythonResult result={results as PythonCellResult} variant={variant} />
			</div>
		);
	}

	if (lang === CellLanguage.SQL) {
		return (
			<div className={classes}>
				<SQLResult result={results as SQLCellResult} variant={variant} />
			</div>
		);
	}

	return null;
}
