import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createAPIContext } from "@/server/trpc-context";
import { appRouter } from "@/server/routers/_app";

export default createNextApiHandler({
	router: appRouter,
	createContext: createAPIContext,
});
