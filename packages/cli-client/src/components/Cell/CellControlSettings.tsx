import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import EllipsisIcon from "../icons/Ellipsis";
import { cn, dismissDropdown } from "@/lib/utils";
import BoltIcon from "../icons/Bolt";
import TrashIcon from "../icons/Trash";
import { useReduxActions } from "@/hooks/redux";
import CollapseIcon from "../icons/Collapse";
import { useRunCode } from "@/hooks/run-code";
import { useReduxSelector } from "@/redux/store";
import { Copy } from "lucide-react";
import CopyIcon from "../icons/Copy";

type Props = {
	id: string;
};

export default function CellControlSettings({ id }: Props) {
	const { deleteCell, clearResults } = useReduxActions();
	const cells = useReduxSelector((state) => state.cells.cells);
	const cell = cells[id];
	const runCell = useRunCode({ id, lang: cell.lang });

	const menuItems = [
		{ icon: <BoltIcon className="w-4 h-4" />, label: "Run", onClick: runCell },
		{
			icon: <CopyIcon className="w-4 h-4" />,
			label: "Copy",
			onClick: () => {
				if (navigator.clipboard) {
					navigator.clipboard.writeText(cell.code);
				}
			},
		},
		{
			icon: <TrashIcon className="w-4 h-4" />,
			label: "Delete",
			onClick: () => deleteCell({ id }),
		},
		{
			icon: <CollapseIcon className="w-4 h-4" />,
			label: "Clear",
			onClick: () => clearResults({ id }),
		},
	];

	return (
		<div className="sticky top-0 h-full z-100">
			<div className="dropdown dropdown-bottom dropdown-end">
				<button>
					<span className="sr-only">Cell settings</span>
					<EllipsisIcon />
				</button>
				<ul
					tabIndex={0}
					className="dropdown-content menu rounded-md w-32 text-sm"
				>
					{menuItems.map((item) => (
						<li key={item.label}>
							<button
								onClick={() => {
									item.onClick();
									dismissDropdown();
								}}
								className="flex items-center gap-2"
							>
								{item.icon}
								<span>{item.label}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
