"use server";

import { PlayerCharacterInput } from "~/data/typings";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

export async function deletePlayerCharacter(campaignId: string, id: string) {
  await api.playerCharacters.delete({ id });
  revalidatePath(`/${campaignId}/playercharacters`);
  redirect(`/${campaignId}/playercharacters`);
}

export async function create(campaignId: string, values: FieldValues) {
  const input = PlayerCharacterInput.parse({
    ...values,
    campaignId: campaignId,
  });
  await api.playerCharacters.create(input);
  revalidatePath('/');
}

export async function edit(id: string, data: FieldValues) {
  const input = PlayerCharacterInput.parse({
    id: id,
    ...data,
  });
  const response = await api.playerCharacters.edit(input);
  revalidatePath('/');
  redirect(`/${response.campaignId}/playercharacters`);
}