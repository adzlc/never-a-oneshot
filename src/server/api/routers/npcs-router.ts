import { z } from "zod";
import { NpcInput } from "~/data/typings";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const npcsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.npc.findUnique({
        where: { id: input },
      });
    }),
  list: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.npc.findMany({
        where: {
          campaignId: input,
        },
        orderBy: {
          name: 'asc'
        },
      });
    }),

  create: protectedProcedure.input(NpcInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.npc.create({
        data: input
      });
    }),

  edit: protectedProcedure.input(NpcInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.npc.update({
        data: input,
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.npc.delete({
        where: { id: input.id },
      });
    }),
});
