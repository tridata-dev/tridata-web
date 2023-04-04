import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CellLanguage } from "./constants";

// this is defined in Astrodown
type CodeBlocks = Record<CellLanguage, string[]>;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateId = (): string => {
	return crypto.randomUUID();
};

export const truncate = (x: number | string, maxLength: number = 20) => {
	const s = x.toString();
	return s.length > maxLength ? `${s.slice(0, maxLength)} ...` : s.toString();
};

const sleepSymbol = Symbol();
export const sleep = (time: number) => {
	return new Promise<Symbol>((resolve) => {
		setTimeout(() => {
			resolve(sleepSymbol);
		}, time);
	});
};

export function groupBy<T, K extends keyof T>(array: T[], key: K) {
	if (!array.length) {
		return new Map<T[K], T[]>();
	}

	const map = new Map<T[K], T[]>();
	array.forEach((item) => {
		const itemKey = item[key];
		if (!map.has(itemKey)) {
			map.set(
				itemKey,
				array.filter((i) => i[key] === item[key]),
			);
		}
	});
	return map;
}

export const errorToString = (err: unknown) => {
	if (err instanceof Error) {
		return err.message;
	}
	return err;
};

export const base64ToObj = (text: string): CodeBlocks => {
	return JSON.parse(atob(text));
};

export const dismissDropdown = () => {
	if (document.activeElement) {
		// @ts-ignore
		document.activeElement.blur();
	}
};
