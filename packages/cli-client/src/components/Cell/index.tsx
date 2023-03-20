import { Cell as CellType, RCellResult, SQLCellResult } from "@/types";
import React from "react";
import CellControl from "./CellControl";
import Editor from "./Editor";
import { CellLanguage } from "@/lib/constants";
import RResult from "../Results/RResult";
import SQLResult from "../Results/SQLResult";
import Results from "../Results";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { results } = cell;

	return (
		<section className="cell group">
			<div className="flex px-1 py-2 gap-1 relative">
				<CellControl id={id} />
				<div className="cell-main flex-1 max-w-2xl">
					<Editor cell={cell} id={id} />
					{results.length > 0 && (
						// @ts-ignore
						<Results results={results} lang={cell.lang} variant="cell" />
					)}
				</div>
			</div>
		</section>
	);
}

export default React.memo(Cell);
