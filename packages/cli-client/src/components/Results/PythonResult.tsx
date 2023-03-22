import { PythonCellResult, ResultVariant } from "@/types";

type Props = {
	result: PythonCellResult;
	variant: ResultVariant;
};

export default function PythonResult({ result, variant }: Props) {
	if (result.type === "stdout") {
		return (
			<pre className="rounded-md text-sm">
				{JSON.stringify(result.data, null, 2)}
			</pre>
		);
	} else {
		return <pre className="text-red-500 rounded-md text-sm">{result.data}</pre>;
	}
}
