"use server";

import { Location, LocationFormValues } from "~/data/typings";
import { getServerAuthSession } from "../auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";


export async function list(campaignId: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  return await db.location.findMany({
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
  return await db.location.findUnique({
    where: {
      id: id
    },
  });
}


export async function create(campaignId: string, values: LocationFormValues) {
  const cs = values as Location;
  cs.campaignId = campaignId;
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.location.create({
      data: cs,
    });
    revalidatePath(`/`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function edit(id: string, data: LocationFormValues) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.location.update({
      where: {
        id: id,
      },
      data: data,
    });
    revalidatePath(`/${response.campaignId}/locations`);
    return response.id;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function deleteLocation(id: string) {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    return;
  }
  try {
    const response = await db.location.delete({
      where: {
        id: id,
      },
    });
    revalidatePath(`/${response.campaignId}/locations`);
    return { response };
  } catch (e) {
    console.log(e);
  }
}