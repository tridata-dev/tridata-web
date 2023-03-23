import { PythonCellResult, ResultVariant } from "@/types";

type Props = {
	result: PythonCellResult;
	variant: ResultVariant;
};

export default function PythonResult({ result, variant }: Props) {
	if (result.type === "stdout") {
		if (result.data.startsWith("data:image/png;base64,")) {
			return <img src={result.data} alt="matplotlib plot" />;
		} else {
			return <pre className="rounded-md text-sm">{result.data}</pre>;
		}
	} else {
		return <pre className="text-red-500 rounded-md text-sm">{result.data}</pre>;
	}
}
