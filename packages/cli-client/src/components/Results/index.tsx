import { CellLanguage } from "@/lib/constants";
import type {
	CodeResults,
	RCellResult,
	ResultVariant,
	SQLCellResult,
} from "@/types";
import RResult from "./RResult";
import SQLResult from "./SQLResult";
import { cn } from "@/lib/utils";

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
		return results.map((result) => (
			<div className={classes}>
				<RResult result={result as RCellResult} variant={variant} />
			</div>
		));
	}

	if (lang === CellLanguage.SQL) {
		return results.map((result) => (
			<div className={classes}>
				<SQLResult result={result as SQLCellResult} variant={variant} />
			</div>
		));
	}

	return null;
}
