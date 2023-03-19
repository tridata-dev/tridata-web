import CellControlSettings from "./CellControlSettings";
import React from "react";
import CellControlQuickActions from "./CellControlQuickActions";

type Props = {
	id: string;
};

function CellControl({ id }: Props) {
	return (
		<div className="w-8 px-1 invisible group-hover:visible flex flex-col items-center sticky top-0 max-h-32">
			<CellControlQuickActions id={id} />
			<CellControlSettings id={id} />
		</div>
	);
}

export default React.memo(CellControl);
