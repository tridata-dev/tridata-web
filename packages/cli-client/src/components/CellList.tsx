import { codeStore } from "@/stores/code";
import Cell from "./Cell";
import { useStore } from "@nanostores/react";

export default function CellList() {
	const { cells, orders } = useStore(codeStore);
	return (
		<section className="cell-list">
			{orders.map((id) => {
				const cell = cells.get(id);
				if (!cell) return null;
				return <Cell key={id} cell={cell} id={id} />;
			})}
		</section>
	);
}
