import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function BoltIcon({ className }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={cn("w-6 h-6", className)}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
			/>
		</svg>
	);
}
