import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import EllipsisIcon from "../icons/Ellipsis";
import { cn } from "@/lib/utils";
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
			<Menu as="div" className="relative inline-block rounded-md">
				<div>
					<Menu.Button className="flex items-center">
						<span className="sr-only">Cell settings</span>
						<EllipsisIcon />
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute -left-24 top-0  mt-2 w-24 origin-top-left rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="py-1">
							{menuItems.map((item) => (
								<Menu.Item key={item.label}>
									{({ active }) => (
										<button
											className={cn(
												active ? "text-primary" : "text-white",
												" px-2 py-2 text-sm w-full flex items-center justify-start gap-2",
											)}
											onClick={item.onClick}
										>
											{item.icon}
											{item.label}
										</button>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
