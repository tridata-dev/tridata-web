import { truncate } from "@/lib/utils";
import { SQLCellResult } from "@/types";

type Props = {
	result: SQLCellResult;
};
export default function SQLResult({ result }: Props) {
	const tableCode = `

    <table class="table-auto mt-4 text-left font-mono text-sm">
			<thead class = "bg-gray-50">
				<tr scope = "col">
				${result.schema
					.map((x) => `<th class = "p-1 border-b">${truncate(x.name)}</th>`)
					.join("")}
				</tr>
			</thead>
			<tbody>
				${result.values
					.map(
						(row) =>
							`<tr class = "whitespace-nowrap bg-white border-b hover:bg-gray-50">${row
								.map((x) => `<td class = "p-1">${truncate(x)}</td>`)
								.join("")}</tr>`,
					)
					.join("")}
			</tbody>
	</table>
    `;

	return (
		<div className="sql-table">
			<p>
				{result.nrow} rows and {result.ncol} columns
			</p>
			<div dangerouslySetInnerHTML={{ __html: tableCode }} />
		</div>
	);
}
