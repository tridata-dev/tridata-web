import { Cell as CellType } from "@/types";
import React, { useEffect } from "react";
import CellEditor from "./CellEditor";
import Results from "../Results";
import CellControlSettings from "./CellControlSettings";
import CellControlQuickActions from "./CellControlQuickActions";
import { useRunCode } from "@/hooks/run-code";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { results } = cell;
	const runCode = useRunCode({ id, lang: cell.lang, type: "cell" });

	useEffect(() => {
		if (cell.autoExecute) {
			runCode();
		}
	}, [cell.autoExecute]);

	return (
		<section className="cell group">
			<div className="flex px-x gap-1">
				<CellControlQuickActions id={id} />
				<div className="cell-main flex-1">
					<CellEditor cell={cell} id={id} />
					{results && (
						// @ts-ignore
						<Results results={results} lang={cell.lang} variant="cell" />
					)}
				</div>
			</div>
		</section>
	);
}

export default React.memo(Cell);
