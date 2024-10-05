import { z } from "zod";
import { CampaignItemInput } from "~/data/typings";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const campaignItemsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.campaignItem.findUnique({
        where: { id: input.id },
      });
    }),
  list: protectedProcedure.input(z.object({ campaignId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.campaignItem.findMany({
        where: { campaignId: input.campaignId },
      });
    }),

  create: protectedProcedure.input(CampaignItemInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaignItem.create({
        data: input
      });
    }),

  edit: protectedProcedure.input(CampaignItemInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaignItem.update({
        data: input,
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaignItem.delete({
        where: { id: input.id },
      });
    }),
});
