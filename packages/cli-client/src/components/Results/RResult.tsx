import type { RCellResult, ResultVariant } from "@/types";
import RCanvas from "./RCanvas";
import Ansi from "ansi-to-react";

type Props = {
	result: RCellResult;
	variant: ResultVariant;
};

export default function RResult({ result, variant }: Props) {
	if (result.type === "stdout") {
		return (
			<Ansi className="whitespace-pre text-sm font-mono">{result.data}</Ansi>
		);
	} else if (result.type === "stderr") {
		return <pre className="text-red-500 rounded-md text-sm">{result.data}</pre>;
	} else if (result.type === "canvasExec") {
		return <RCanvas drawCanvasCode={result.data} variant={variant} />;
	} else {
		return null;
	}
}
