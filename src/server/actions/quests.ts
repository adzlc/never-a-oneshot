"use server";

import { Quest, QuestFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";


export async function list(campaignId: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.quest.findMany({
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
  if (id == null || id == "") {
    return null;
  }
  return await db.quest.findUnique({
    where: {
      id: id
    },
  });
}


export async function create(campaignId: string, values: QuestFormValues) {
  const cs = values as Quest;
  cs.campaignId = campaignId;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.quest.create({
      data: cs,
    });
    revalidatePath(`/`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function edit(id: string, data: QuestFormValues) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.quest.update({
      where: {
        id: id,
      },
      data: data,
    });
    revalidatePath(`/${response.campaignId}/quests`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteQuest(id: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.quest.delete({
      where: {
        id: id,
      },
    });
    revalidatePath(`/${response.campaignId}/quests`);
    return { response };
  } catch (e) {
    console.log(e);
  }
}