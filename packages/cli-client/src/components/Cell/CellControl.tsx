import CellControlSettings from "./CellControlSettings";
import React from "react";
import CellControlAdd from "./CellControlAdd";

type Props = {
	id: string;
};

function CellControl({ id }: Props) {
	return (
		<div className="w-8 px-1 invisible group-hover:visible flex flex-col gap-1 items-center">
			<CellControlAdd id={id} />
			<div className="bg-gray-100 flex-1 hover:bg-gray-300">
				<CellControlSettings id={id} />
			</div>
		</div>
	);
}

export default React.memo(CellControl);
