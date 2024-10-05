import { z } from "zod";
import { QuestInput } from "~/data/typings";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";



export const questsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.quest.findUnique({
        where: { id: input },
      });
    }),
  list: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.quest.findMany({
        where: {
          campaignId: input,
        },
        orderBy: {
          name: 'asc'
        },
        include: {
          questGiver: true,
          campaign: true,
        }
      });
    }),

  create: protectedProcedure.input(QuestInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.quest.create({
        data: input
      });
    }),

  edit: protectedProcedure.input(QuestInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.quest.update({
        data: input,
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.quest.delete({
        where: { id: input.id },
      });
    }),
});
