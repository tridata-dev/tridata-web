import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CellLanguages, CellLanguage } from "@/lib/constants";

interface Props {
	setLang: (lang: CellLanguage) => void;
}

export default function LanguageSelect({ setLang }: Props) {
	return (
		<div className="my-2">
			<DropdownMenu>
				<DropdownMenuTrigger>Select Language</DropdownMenuTrigger>
				<DropdownMenuContent>
					{CellLanguages.map((lang) => (
						<DropdownMenuItem onSelect={() => setLang(lang)} key={lang}>
							{lang}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
