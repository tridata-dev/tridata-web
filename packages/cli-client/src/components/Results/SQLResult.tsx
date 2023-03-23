import { cn, truncate } from "@/lib/utils";
import { ResultVariant, SQLCellResult } from "@/types";

type Props = {
	result: SQLCellResult;
	variant: ResultVariant;
};

export default function SQLResult({ result, variant }: Props) {
	const isCell = variant === "cell";
	const theadClases = cn("p-1 border-b", {
		"border-dashed border": !isCell,
	});
	const trClasses = cn("whitespace-nowrap", {
		"bg-white hover:bg-gray-100 border-b": isCell,
	});
	const tdClasses = cn("p-1", { "border-dashed border": !isCell });

	if (result.type === "stderr") {
		return <pre className="text-red-500 text-sm">{result.data}</pre>;
	}

	return (
		<div className="sql-table">
			{/* <div
				dangerouslySetInnerHTML={{ __html: makeTableHTML(result, isCell) }}
			/> */}
			<table className="table-auto mt-4 text-left">
				<thead className={cn({ "bg-gray-100": isCell })}>
					<tr>
						{result.data.schema.map((x) => (
							<th className={theadClases}>{truncate(x.name)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{result.data.values.map((row) => (
						<tr className={trClasses}>
							{row.map((x) => (
								<td className={tdClasses}>{truncate(x)}</td>
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
