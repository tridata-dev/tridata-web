import Cell from "./Cell";
import { useReduxSelector } from "@/redux/store";

export default function CellList() {
	// const { cells, orders } = useStore(codeStore);
	const { cells, orders } = useReduxSelector((store) => store.cells);
	return (
		<section className="space-y-4">
			{orders.map((id) => {
				const cell = cells[id];
				return <Cell key={id} cell={cell} id={id} />;
			})}
		</section>
	);
}
