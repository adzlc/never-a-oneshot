import { z } from "zod";
import { PlayerCharacterInput } from "~/data/typings";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const playerCharactersRouter = createTRPCRouter({
  get: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.playerCharacter.findUnique({
        where: { id: input },
      });
    }),
  list: protectedProcedure.input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.playerCharacter.findMany({
        where: {
          campaignId: input,
        },
        orderBy: {
          name: 'asc'
        },
      });
    }),

  create: protectedProcedure.input(PlayerCharacterInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.playerCharacter.create({
        data: input
      });
    }),

  edit: protectedProcedure.input(PlayerCharacterInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.playerCharacter.update({
        data: input,
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure.input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.playerCharacter.delete({
        where: { id: input.id },
      });
    }),
});
