import { campaignItemsRouter } from "~/server/api/routers/campaignitems";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { campaignSessionsRouter } from "./routers/campaignsessions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  campaignItems: campaignItemsRouter,
  campaignSessions: campaignSessionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
