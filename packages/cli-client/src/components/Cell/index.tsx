import { Cell as CellType } from "@/types";
import React from "react";
import Editor from "./Editor";
import Results from "../Results";
import CellControlSettings from "./CellControlSettings";
import CellControlQuickActions from "./CellControlQuickActions";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { results } = cell;

	return (
		<section className="cell group">
			<div className="flex px-1 py-2 gap-1 relative">
				<CellControlQuickActions id={id} />
				<div className="cell-main flex-1 max-w-2xl">
					<Editor cell={cell} id={id} />
					{results &&
					// @ts-ignore
						<Results results={results} lang={cell.lang} variant="cell" />}
				</div>
				<CellControlSettings id={id} />
			</div>
		</section>
	);
}

export default React.memo(Cell);
