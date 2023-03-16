import { SupportedLanguage } from "@/lib/constants";
import RResult from "./RResult";
import type { RCellResult } from "@/types/store";
import RCanvas from "./RCanvas";

interface Props {
	data: { lang: SupportedLanguage; result: RCellResult };
}

export default function Result({ data }: Props) {
	return (
		<div className="cell-result my-2">
			{data.lang === SupportedLanguage.R && <RResult result={data.result} />}
		</div>
	);
}
