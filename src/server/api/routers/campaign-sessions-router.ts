import { z } from "zod";
import { CampaignSessionInput } from "~/data/typings";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const campaignSessionsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.campaignSession.findUnique({
        where: { id: input.id },
      });
    }),
  list: protectedProcedure.input(z.object({ campaignId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.campaignSession.findMany({
        where: { campaignId: input.campaignId },
      });
    }),

  create: protectedProcedure.input(CampaignSessionInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaignSession.create({
        data: input
      });
    }),

  edit: protectedProcedure.input(CampaignSessionInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaignSession.update({
        data: input,
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaignSession.delete({
        where: { id: input.id },
      });
    }),
});
