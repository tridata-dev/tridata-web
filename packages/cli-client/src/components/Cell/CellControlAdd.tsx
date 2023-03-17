import { useReduxActions } from "@/hooks/redux";
import PlusIcon from "../icons/Plus";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CellLanguages } from "@/lib/constants";

type Props = {
	id: string;
};

export default function CellControlAdd({ id }: Props) {
	const { insertCell } = useReduxActions();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={() => insertCell({ afterId: id })}
					className="rounded-full hover:bg-gray-100 p-1"
				>
					<PlusIcon className="w-5 h-5" />
				</TooltipTrigger>
				<TooltipContent className="w-24 origin-top-right rounded-md bg-white shadow-lg p-0 border-none">
					<ul className="bg-white text-black text-sm p-2">
						{CellLanguages.map((lang) => (
							<li
								className="px-2 py-1 rounded-md hover:bg-gray-200 flex justify-start"
								key={lang}
							>
								<button
									onClick={() => insertCell({ afterId: id, lang })}
									className="text-left"
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
}
