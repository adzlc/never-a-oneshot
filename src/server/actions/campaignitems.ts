"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { CampaignItemInput } from "~/data/typings";
import { api } from "~/trpc/server";

export async function deleteCampaignItem(campaignId: string, id: string) {
  const response = await api.campaignItems.delete({ id });
  revalidatePath(`/${campaignId}/campaignitems`);
  redirect(`/${campaignId}/campaignitems`);
}

export async function create(campaignId: string, values: FieldValues) {
  const input = CampaignItemInput.parse({
    campaignId: campaignId,
    ...values,
  });
  await api.campaignItems.create(input);
  revalidatePath(`/${campaignId}/campaignitems`);
}

export async function edit(id: string, data: FieldValues) {
  const input = CampaignItemInput.parse({
    id: id,
    ...data,
  });
  const response = await api.campaignItems.edit(input);
  revalidatePath(`/${response.campaignId}/campaignitems`);
  redirect(`/${response.campaignId}/campaignitems`);
}