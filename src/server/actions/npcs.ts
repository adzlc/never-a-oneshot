"use server";

import { Npc, NpcFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function list(campaignId: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.npc.findMany({
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
  return session == null ? null : getNpc(id);
}

export async function getNpc(
  id: string
) {
  if (id == null || id == "") {
    return null;
  }
  return await db.npc.findUnique({
    where: {
      id: id
    },
  });
}

export async function create(campaignId: string, pcValues: NpcFormValues) {
  const Npc = pcValues as Npc;
  Npc.campaignId = campaignId;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.npc.create({
      data: Npc,
    });
    revalidatePath(`/`);
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function edit(id: string, data: NpcFormValues) {
  const editedPc = await editNpc(id, data as Npc);
  revalidatePath(`/npcs/${editedPc?.response.campaignId}`);
}

async function editNpc(id: string, data: Npc) {
  try {
    const session = await getServerAuthSession();
    const response = await db.npc.update({
      where: {
        id: id,
      },
      data: data,
    });
    return { response };
  } catch (e) {
    console.log(e);
  }
}

export async function deleteNpc(id: string) {
  try {
    const session = await getServerAuthSession();
    const response = await db.npc.delete({
      where: {
        id: id,
      },
    });
    return { response };
  } catch (e) {
    console.log(e);
  }
}