import { useReduxActions } from "@/hooks/redux";
import PlusIcon from "../icons/Plus";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellLanguages } from "@/lib/constants";
import ForwardIcon from "../icons/Forward";
import { useRunCode } from "@/hooks/run-code";
import { useReduxSelector } from "@/redux/store";
import SpinnerIcon from "../icons/Spinner";

const Add = ({ id }: Props) => {
	const { insertCell } = useReduxActions();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={() => insertCell({ afterId: id })}
					className="rounded-md hover:bg-gray-100 p-1"
				>
					<PlusIcon className="w-5 h-5" />
				</TooltipTrigger>
				<TooltipContent className="w-24 origin-top-right rounded-md bg-white shadow-lg p-0 border-none">
					<ul className="bg-white text-black p-2">
						{CellLanguages.map((lang) => (
							<li
								className="px-2 py-1 rounded-md hover:bg-gray-200 flex justify-start"
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
		<button
			onClick={() => runCell()}
			className="rounded-md hover:bg-gray-200 px-1"
		>
			<ForwardIcon />
		</button>
	);
};

type Props = {
	id: string;
};

export default function CellControlQuickActions({ id }: Props) {
	return (
		<div className="flex flex-col items-center">
			<Run id={id} />
			<Add id={id} />
		</div>
	);
}
