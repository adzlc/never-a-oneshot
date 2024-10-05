"use server";

import { CampaignSessionInput } from "~/data/typings";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { FieldValues } from "react-hook-form";

/**
 * Server actions for CampaignItem.
 * Must only contain mutations.
 */

export async function deleteCampaignSession(campaignId: string, id: string) {
  await api.campaignSessions.delete({ id });
  revalidatePath(`/${campaignId}/campaignsessions`);
  redirect(`/${campaignId}/campaignsessions`);
}

export async function create(campaignId: string, values: FieldValues) {
  const input = CampaignSessionInput.parse({
    campaignId: campaignId,
    ...values,
  });
  await api.campaignSessions.create(input);
  revalidatePath('/');
}

export async function edit(id: string, data: FieldValues) {
  const input = CampaignSessionInput.parse({
    id: id,
    ...data,
  });
  const response = await api.campaignSessions.edit(input);
  revalidatePath('/');
  redirect(`/${response.campaignId}/campaignsessions`);
}

