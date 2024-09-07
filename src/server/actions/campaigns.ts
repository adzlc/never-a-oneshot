"use server";
import { revalidatePath } from "next/cache";
import {
  type CampaignFormValues,
  type Campaign,
} from "~/data/typings";
import { db } from "~/server/db";
import { getServerAuthSession } from "../auth";

export async function list() {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.campaign.findMany({
    where: {
      createdById: session?.user?.id,
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function get(id: string) {
  const session = await getServerAuthSession();
  return session == null ? null : getCampaign(id, session.user.id);
}

export async function getCampaign(
  id: string,
  userId: string | undefined | null,
) {
  if (id == null || id == "" || userId == null) {
    return null;
  }
  return await db.campaign.findUnique({
    where: {
      id: id,
      createdById: userId,
    },
  });
}

export async function create(campaign: CampaignFormValues) {
  const response = await createCampaign(campaign as Campaign);
  if (response) {
    revalidatePath(`/`);
  }
}

export async function createCampaign(campaign: Campaign) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    campaign.createdById = session.user.id;
    const response = await db.campaign.create({
      data: campaign,
    });
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function editCampaign(
  id: string,
  data: CampaignFormValues,
) {
  await updateCampaign(id, data as Campaign);
}

export async function updateCampaign(
  id: string,
  campaign: Campaign,
) {
  const session = await getServerAuthSession();
  try {
    const response = await db.campaign.update({
      where: {
        id: id,
        createdById: session?.user?.id,
      },
      data: campaign,
    });
    return { response };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteCampaign(id: string) {
  const session = await getServerAuthSession();

  try {
    const response = await db.campaign.delete({
      where: {
        id: id,
        createdById: session?.user?.id,
      },
    });
    return { response };
  } catch (e) {
    console.log(e);
  }
}
