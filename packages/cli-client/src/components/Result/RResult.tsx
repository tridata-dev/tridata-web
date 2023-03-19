import type { RCellResult } from "@/types";
import { useEffect, useRef } from "react";
import RCanvas from "./RCanvas";

type Props = {
	result: RCellResult;
};

export default function RResult({ result }: Props) {
	if (result.type === "stdout") {
		return (
			<pre className="text-sm p-2 bg-gray-100 rounded-md">{result.data}</pre>
		);
	}

	if (result.type === "stderr") {
		return (
			<pre className="text-sm text-red-500 p-2 rounded-md">{result.data}</pre>
		);
	}

	if (result.type === "canvasExec") {
		return <RCanvas drawCanvasCode={result.data} />;
	}

	return null;
}
