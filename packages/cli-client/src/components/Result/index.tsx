import { CellLanguage } from "@/lib/constants";
import RResult from "./RResult";
import type { RCellResult } from "@/types/store";
import RCanvas from "./RCanvas";

interface Props {
	data: { lang: CellLanguage; result: RCellResult };
}

export default function Result({ data }: Props) {
	return (
		<div className="cell-result my-4">
			{data.lang === CellLanguage.R && <RResult result={data.result} />}
		</div>
	);
}
