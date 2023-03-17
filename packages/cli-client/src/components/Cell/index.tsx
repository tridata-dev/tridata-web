import { Button } from "../ui/button";
import { Cell as CellType } from "@/types/store";
import Result from "../Result";
import React from "react";
import { useReduxActions } from "@/hooks/redux";
import CellControl from "./CellControl";
import Editor from "./Editor";
import { useRunCell } from "@/hooks/run-cell";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { results } = cell;

	return (
		<section className="cell my-4 group">
			{/* <LanguageSelect /> */}
			<div className="flex px-1 py-4 gap-1">
				<CellControl id={id} />
				<div className="cell-main flex-1">
					<Editor cell={cell} id={id} />
					{results.map((result, i) => {
						return (
							<Result
								data={{ lang: cell.lang, result }}
								key={`cell-${id}-result-${i}`}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default React.memo(Cell);
