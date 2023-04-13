import { cn, truncate } from "@/lib/utils";
import { ResultVariant, SQLCellResult } from "@/types";

type Props = {
	result: SQLCellResult;
	variant: ResultVariant;
};

export default function SQLResult({ result, variant }: Props) {
	const isCell = variant === "cell";

	if (result.type === "stderr") {
		return <pre className="text-red-500 text-sm">{result.data}</pre>;
	}

	return (
		<div className="sql-table font-mono">
			{/* <div
				dangerouslySetInnerHTML={{ __html: makeTableHTML(result, isCell) }}
			/> */}
			<table className="table-auto mt-4 text-left">
				<thead>
					<tr>
						{result.data.schema.map((x) => (
							<th className="px-2" key={x.name}>
								{truncate(x.name)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{result.data.values.map((row) => (
						<tr>
							{row.map((x) => (
								<td className="px-2">{truncate(x)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<p className="mt-2">
				{result.data.nrow} rows and {result.data.ncol} columns
			</p>
		</div>
	);
}
