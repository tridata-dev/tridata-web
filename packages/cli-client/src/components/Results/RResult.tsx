import type { RCellResult, ResultVariant } from "@/types";
import RCanvas from "./RCanvas";

type Props = {
	result: RCellResult;
	variant: ResultVariant;
};

export default function RResult({ result, variant }: Props) {
	if (result.type === "stdout") {
		return <pre className="rounded-md">{result.data}</pre>;
	}

	if (result.type === "stderr") {
		return <pre className="text-red-500 rounded-md">{result.data}</pre>;
	}

	if (result.type === "canvasExec") {
		return <RCanvas drawCanvasCode={result.data} variant={variant} />;
	}

	return null;
}
