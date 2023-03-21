import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

	let map = new Map<T[K], T[]>();
	array.forEach((item) => {
		let itemKey = item[key];
		if (!map.has(itemKey)) {
			map.set(
				itemKey,
				array.filter((i) => i[key] === item[key]),
			);
		}
	});
	return map;
}
