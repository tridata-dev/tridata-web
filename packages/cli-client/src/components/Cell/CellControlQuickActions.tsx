import { useReduxActions } from "@/hooks/redux";
import PlusIcon from "../icons/Plus";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellLanguages } from "@/lib/constants";
import { useRunCode } from "@/hooks/run-code";
import { useReduxSelector } from "@/redux/store";
import SpinnerIcon from "../icons/Spinner";
import PlayIcon from "../icons/Play";
import XIcon from "../icons/X";

type Props = {
	id: string;
};

const Delete = ({ id }: Props) => {
	const { deleteCell } = useReduxActions();
	return (
		<button onClick={() => deleteCell({ id })} className="rounded-md p-1">
			<XIcon className="w-4 h-4 hover:stroke-primary" />
		</button>
	);
};

const Add = ({ id }: Props) => {
	const { insertCell } = useReduxActions();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={() => insertCell({ afterId: id })}
					className="rounded-md p-1"
				>
					<PlusIcon className="w-4 h-4 hover:stroke-primary" />
				</TooltipTrigger>
				<TooltipContent className="w-24 origin-top-right rounded-md shadow-lg border-none">
					<ul className=" text-white p-2">
						{CellLanguages.map((lang) => (
							<li
								className="px-2 py-1 rounded-md flex justify-start hover:bg-base-100"
								key={lang}
							>
								<button
									onClick={() => insertCell({ afterId: id, lang })}
									className="w-full text-left text-xs font-mono"
								>
									{lang}
								</button>
							</li>
						))}
					</ul>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const Run = ({ id }: { id: string }) => {
	const { cells } = useReduxSelector((store) => store.cells);
	const cell = cells[id];
	const runCell = useRunCode({ id, lang: cell.lang });

	return cell.pending ? (
		<SpinnerIcon className="w-4 h-4" />
	) : (
		<button onClick={() => runCell()} className="rounded-md p-1">
			<PlayIcon className="w-4 h-4 hover:stroke-primary" />
		</button>
	);
};

export default function CellControlQuickActions({ id }: Props) {
	return (
		<div className="w-8 px-1 invisible group-hover:visible flex flex-col items-center sticky top-0 h-8">
			<div className="flex flex-col items-center">
				<Run id={id} />
				<Add id={id} />
				<Delete id={id} />
			</div>
		</div>
	);
}
