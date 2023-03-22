import { cn, truncate } from "@/lib/utils";
import { ResultVariant, SQLCellResult } from "@/types";

type Props = {
	result: SQLCellResult;
	variant: ResultVariant;
};

const makeTableHTML = (result: SQLCellResult, isCell: boolean) => {
	return `
    <table class="table-auto mt-4 text-left">
			<thead class = ${cn({ "bg-gray-100": isCell })}>
				<tr scope = "col">
				${result.schema
					.map(
						(x) =>
							`<th class = ${cn("p-1", {
								"border-b-2": isCell,
								"bordered border-dashed": !isCell,
							})}>${truncate(x.name)}</th>`,
					)
					.join("")}
				</tr>
			</thead>
			<tbody>
				${result.values
					.map(
						(row) =>
							`<tr class = ${cn("whitespace-nowrap border-b ", {
								"bg-white hover:bg-gray-100": isCell,
							})}>${row
								.map((x) => `<td class = "p-1">${truncate(x)}</td>`)
								.join("")}</tr>`,
					)
					.join("")}
			</tbody>
	</table>
    `;
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

	return (
		<div className="sql-table">
			{/* <div
				dangerouslySetInnerHTML={{ __html: makeTableHTML(result, isCell) }}
			/> */}
			<table className="table-auto mt-4 text-left">
				<thead className={cn({ "bg-gray-100": isCell })}>
					<tr>
						{result.schema.map((x) => (
							<th className={theadClases}>{truncate(x.name)}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{result.values.map((row) => (
						<tr className={trClasses}>
							{row.map((x) => (
								<td className={tdClasses}>{truncate(x)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<p className="mt-2">
				{result.nrow} rows and {result.ncol} columns
			</p>
		</div>
	);
}
