"use server";

import { NpcInput } from "~/data/typings";

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function deleteNpc(campaignId: string, id: string) {
  await api.npcs.delete({ id });
  revalidatePath(`/${campaignId}/npcs`);
  redirect(`/${campaignId}/npcs`);
}

export async function create(campaignId: string, values: FieldValues) {
  const input = NpcInput.parse({
    ...values,
    campaignId: campaignId,
  });
  await api.npcs.create(input);
  revalidatePath('/');
}

export async function edit(id: string, data: FieldValues) {
  const input = NpcInput.parse({
    id: id,
    ...data,
  });
  const response = await api.npcs.edit(input);
  revalidatePath('/');
  redirect(`/${response.campaignId}/npcs`);
}