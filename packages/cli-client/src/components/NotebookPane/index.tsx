import CellList from "../CellList";

export default function NotebookPane() {
	return (
		<section style={{ width: "50%" }} className="p-4">
			<CellList />
		</section>
	);
}
