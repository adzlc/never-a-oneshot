import { z } from "zod";
import { LocationInput } from "~/data/typings";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";



export const locationsRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.location.findUnique({
        where: { id: input },
      });
    }),
  list: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.location.findMany({
        where: {
          campaignId: input,
        },
        orderBy: {
          name: 'asc'
        },
      });
    }),

  create: protectedProcedure.input(LocationInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.location.create({
        data: input
      });
    }),

  edit: protectedProcedure.input(LocationInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.location.update({
        data: input,
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.location.delete({
        where: { id: input.id },
      });
    }),
});
