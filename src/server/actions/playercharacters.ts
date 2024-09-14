"use server";

import { PlayerCharacter, PlayerCharacterFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

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

export async function create(campaignId: string, pcValues: PlayerCharacterFormValues): Promise<string> {
  console.log('Creating PlayerCharacter', pcValues)
  const playerCharacter = pcValues as PlayerCharacter;
  playerCharacter.campaignId = campaignId;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return "";
  }
  try {
    const response = await db.playerCharacter.create({
      data: playerCharacter,
    });
    revalidatePath(`/`);
    return response.id;
  } catch (e) {
    console.log(e);
    return "";
  }
}

export async function edit(id: string, data: PlayerCharacterFormValues): Promise<string> {
  const editedPc = await editPlayerCharacter(id, data as PlayerCharacter);
  revalidatePath(`/${editedPc?.campaignId}/playercharacters`);
  return editedPc?.id ?? "";
}

async function editPlayerCharacter(id: string, data: PlayerCharacter) {
  try {
    const session = await getServerAuthSession();
    const response = await db.playerCharacter.update({
      where: {
        id: id,
      },
      data: data,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function deletePlayerCharacter(id: string) {
  try {
    const session = await getServerAuthSession();
    const response = await db.playerCharacter.delete({
      where: {
        id: id,
      },
    });
    return { response };
  } catch (e) {
    console.log(e);
  }
}