import * as z from "zod";
import {
  type Prisma,
  type Campaign as CampaignPrisma,
  type World as WorldPrisma,
  type PlayerCharacter as PlayerCharacterPrisma,
  type Npc as NpcPrisma,
} from "@prisma/client";

/**
 * Export the Prisma types to our own type.
 */
export type Campaign = CampaignPrisma;
export type World = WorldPrisma;
export type PlayerCharacter = PlayerCharacterPrisma;
export type Npc = NpcPrisma;



export type CampaignAll = Prisma.CampaignGetPayload<{
  include: { npcs: true, players: true, world: true };
}>;


export const CampaignInput = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().optional(),
  story: z.string().optional(),
  world: z.string().optional(),
});

export type CampaignFormValues = z.infer<typeof CampaignInput>;

export const PlayerCharacterInput = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  race: z.string().min(1, {
    message: "Race is required.",
  }),
  class: z.string().min(1, {
    message: "Class is required.",
  }),
  backstory: z.string().optional(),
  campaignId: z.string(),
});
export type PlayerCharacterFormValues = z.infer<typeof PlayerCharacterInput>;

export const NpcInput = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  race: z.string().optional(),
  class: z.string().optional(),
  description: z.string().optional(),
  allegiance: z.string().optional(),
  faction: z.string().optional(),
  campaignId: z.string(),
  imageUrl: z.string().optional(),
});
export type NpcFormValues = z.infer<typeof NpcInput>;

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export const GENDERS = [Gender.Female, Gender.Male];

export const CLASSES = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Artificer',
  'Wizard',
]

export const ALLEGIANCES = [
  'Neutral',
  'Friendly',
  'Enemy',
  'Unknown',
]