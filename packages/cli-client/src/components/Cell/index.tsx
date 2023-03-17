import { Button } from "../ui/button";
import { Cell as CellType } from "@/types/store";
import Result from "../Result";
import React from "react";
import { useReduxActions } from "@/hooks/redux";
import { useReduxDispatch, useReduxSelector } from "@/redux/store";
import { runCode } from "@/redux/thunks/cells";
import { TridataError } from "@tridata/core";
import { toast } from "sonner";
import CellControl from "./CellControl";
import Editor from "./Editor";

interface Props {
	cell: CellType;
	id: string;
}

function Cell({ cell, id }: Props) {
	const { insertCell, deleteCell } = useReduxActions();
	const dispatch = useReduxDispatch();

	const { results } = cell;

	const handleExecute = async () => {
		dispatch(runCode({ id }))
			.unwrap()
			.catch((err) => {
				if (err instanceof TridataError) {
					toast(err.message);
				}
			});
	};

	return (
		<section className="cell my-4 group">
			{/* <LanguageSelect /> */}
			<div className="flex px-1 py-4">
				<CellControl id={id} />
				<div className="cell-main flex-1">
					<Editor cell={cell} id={id} />
					<div className="flex gap-1">
						<Button onClick={() => insertCell({ afterId: id })}>
							add cell
						</Button>
						<Button onClick={() => deleteCell({ id })}>delete cell</Button>
						<Button onClick={() => handleExecute()} className="ml-auto">
							run code
						</Button>
					</div>

					{results.map((result, i) => {
						// if (result.type === "canvasExec") {
						// 	return (
						// 		<RCanvas
						// 			drawCanvasCode={result.data}
						// 			key={`cell-${id}-result-${i}`}
						// 		/>
						// 	);
						// } else {
						// 	<Result data={{ lang, result }} key={`cell-${id}-result-${i}`} />;
						// }
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
