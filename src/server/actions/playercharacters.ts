"use server";

import { Campaign, CampaignFormValues, PlayerCharacterFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { PlayerCharacter } from "@prisma/client";

export async function list(campaignId: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.playerCharacter.findMany({
    where: {
      campaignId: campaignId,
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function get(id: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return session == null ? null : getPlayerCharacter(id);
}

export async function getPlayerCharacter(
  id: string
) {
  if (id == null || id == "") {
    return null;
  }
  return await db.playerCharacter.findUnique({
    where: {
      id: id
    },
  });
}

export async function create(pcValues: PlayerCharacterFormValues) {
  const playerCharacter = pcValues as PlayerCharacter;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }

  try {
    const response = await db.playerCharacter.create({
      data: playerCharacter,
    });
    revalidatePath(`/`);
  } catch (e) {
    console.log(e);
    return null;
  }
}