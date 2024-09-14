"use server";

import { CampaignSession, CampaignSessionFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function list(campaignId: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.campaignSession.findMany({
    where: {
      campaignId: campaignId,
    },
    orderBy: {
      sessionDate: 'asc'
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
  return await db.campaignSession.findUnique({
    where: {
      id: id
    },
  });
}


export async function create(campaignId: string, values: CampaignSessionFormValues) {
  const cs = values as CampaignSession;
  cs.campaignId = campaignId;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.campaignSession.create({
      data: cs,
    });
    revalidatePath(`/`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function edit(id: string, data: CampaignSessionFormValues) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.campaignSession.update({
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

export async function deletecampaignSession(id: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.campaignSession.delete({
      where: {
        id: id,
      },
    });
    return { response };
  } catch (e) {
    console.log(e);
  }
}