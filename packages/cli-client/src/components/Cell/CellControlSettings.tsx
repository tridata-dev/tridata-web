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

type Props = {
	id: string;
};

export default function CellControlSettings({ id }: Props) {
	const { deleteCell, clearResults } = useReduxActions();
	const cells = useReduxSelector((state) => state.cells.cells);
	const cell = cells[id];
	const runCell = useRunCode({ id, lang: cell.lang });

	const menuItems = [];

	return (
		<Menu
			as="div"
			className="relative inline-block text-left hover:bg-gray-100 rounded"
		>
			<div>
				<Menu.Button className="flex items-center ">
					<span className="sr-only">Open options</span>
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
				<Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									className={cn(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										" px-2 py-2 text-sm w-full flex items-center justify-start gap-2",
									)}
									onClick={() => runCell()}
								>
									<BoltIcon className="w-4 h-4" />
									Run
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={cn(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										" px-2 py-2 text-sm w-full flex items-center justify-start gap-2",
									)}
									onClick={() => deleteCell({ id })}
								>
									<TrashIcon className="w-4 h-4" />
									Delete
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={cn(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										" px-2 py-2 text-sm w-full flex items-center justify-start gap-2",
									)}
									onClick={() => clearResults({ id })}
								>
									<CollapseIcon className="w-4 h-4" />
									Clear
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
