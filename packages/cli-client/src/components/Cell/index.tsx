import { Cell as CellType, RCellResult, SQLCellResult } from "@/types";
import React from "react";
import CellControl from "./CellControl";
import Editor from "./Editor";
import { CellLanguage } from "@/lib/constants";
import RResult from "../Result/RResult";
import SQLResult from "../Result/SQLResult";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { results } = cell;
	let resultDisplay: React.ReactNode;
	if (cell.lang === CellLanguage.R) {
		resultDisplay = results.map((result, i) => (
			<RResult result={result as RCellResult} key={`cell-${id}-result-${i}`} />
		));
	} else if (cell.lang === CellLanguage.SQL) {
		resultDisplay = results.map((result, i) => (
			<SQLResult
				result={result as SQLCellResult}
				key={`cell-${id}-result-${i}`}
			/>
		));
	}

	return (
		<section className="cell my-4 group">
			<div className="flex px-1 py-4 gap-1 relative">
				<CellControl id={id} />
				<div className="cell-main flex-1 max-w-2xl">
					<Editor cell={cell} id={id} />
					<div className="cell-result my-4">{resultDisplay}</div>
				</div>
			</div>
		</section>
	);
}

export default React.memo(Cell);
