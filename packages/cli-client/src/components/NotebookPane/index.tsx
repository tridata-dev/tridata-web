import { useReduxActions } from "@/hooks/redux";
import CellList from "../CellList";
import { useReduxSelector } from "@/redux/store";

export default function NotebookPane() {
	const { activePane } = useReduxSelector((state) => state.editor);
	const { pushCell } = useReduxActions();

	return (
		<section className="p-4">
			<button
				className="btn btn-secondary btn-sm btn-outline ml-8 mb-4"
				onClick={() => {
					pushCell({ lang: activePane });
				}}
			>
				Add Cell
			</button>
			<CellList />
		</section>
	);
}
