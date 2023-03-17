import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function CollapseIcon({ className }: Props) {
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
				d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
			/>
		</svg>
	);
}
