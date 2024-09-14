"use server";

import { CampaignItem, CampaignItemFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function list(campaignId: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.campaignItem.findMany({
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
  return await db.campaignItem.findUnique({
    where: {
      id: id
    },
  });
}


export async function create(campaignId: string, values: CampaignItemFormValues) {
  const cs = values as CampaignItem;
  cs.campaignId = campaignId;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.campaignItem.create({
      data: cs,
    });
    revalidatePath(`/`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function edit(id: string, data: CampaignItemFormValues) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.campaignItem.update({
      where: {
        id: id,
      },
      data: data,
    });
    revalidatePath(`/${response.campaignId}/campaignsessions`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deletecampaignItem(id: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.campaignItem.delete({
      where: {
        id: id,
      },
    });
    return { response };
  } catch (e) {
    console.log(e);
  }
}