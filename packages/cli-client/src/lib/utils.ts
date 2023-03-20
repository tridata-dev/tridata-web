import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateId = () => {
	return crypto.randomUUID();
};

export const truncate = (x: number | string, maxLength: number = 20) => {
	const s = x.toString();
	return s.length > maxLength ? `${s.slice(0, maxLength)} ...` : s.toString();
};
