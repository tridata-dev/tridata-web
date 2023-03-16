import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { SupportedLangauges, SupportedLanguage } from "@/lib/constants";

interface Props {
	setLang: (lang: SupportedLanguage) => void;
}

export default function LanguageSelect({ setLang }: Props) {
	return (
		<div className="my-2">
			<DropdownMenu>
				<DropdownMenuTrigger>Select Language</DropdownMenuTrigger>
				<DropdownMenuContent>
					{SupportedLangauges.map((lang) => (
						<DropdownMenuItem onSelect={() => setLang(lang)} key={lang}>
							{lang}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
