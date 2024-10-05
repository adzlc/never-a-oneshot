"use server";

import { QuestInput } from "~/data/typings";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";
/**
 * Server actions for Quest.
 * Must only contain mutations.
 */

export async function deleteQuest(campaignId: string, id: string) {
  await api.quests.delete({ id });
  revalidatePath(`/${campaignId}/quests`);
  redirect(`/${campaignId}/quests`);
}

export async function create(campaignId: string, values: FieldValues) {
  const input = QuestInput.parse({
    campaignId: campaignId,
    ...values,
  });
  await api.quests.create(input);
  revalidatePath('/');
}

export async function edit(id: string, data: FieldValues) {
  const input = QuestInput.parse({
    id: id,
    ...data,
  });
  const response = await api.quests.edit(input);
  revalidatePath('/');
  redirect(`/${response.campaignId}/quests`);
}