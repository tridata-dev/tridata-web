import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

export type APIContext = inferAsyncReturnType<typeof createAPIContext>;

export const createAPIContext = async (opts: CreateNextContextOptions) => ({
	...opts,
});
