export enum TridataErrorName {
	WEBR_NOT_FOUND = "WEBR_NOT_FOUND",
}

export class TridataError extends Error {
	name: TridataErrorName;
	message: string;

	constructor({ name, message }: { name: TridataErrorName; message: string }) {
		super();
		this.name = name;
		this.message = message;
	}
}
