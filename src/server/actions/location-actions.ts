"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { LocationInput } from "~/data/typings";
import { api } from "~/trpc/server";

/**
 * Server actions for Locations.
 * Must only contain mutations.
 */

export async function deleteLocation(campaignId: string, id: string) {
  await api.locations.delete({ id });
  revalidatePath(`/${campaignId}/locations`);
  redirect(`/${campaignId}/locations`);
}

export async function create(campaignId: string, values: FieldValues) {
  const input = LocationInput.parse({
    campaignId: campaignId,
    ...values,
  });
  await api.locations.create(input);
  revalidatePath('/');
}

export async function edit(id: string, data: FieldValues) {
  const input = LocationInput.parse({
    id: id,
    ...data,
  });
  const response = await api.locations.edit(input);
  revalidatePath('/');
  redirect(`/${response.campaignId}/locations`);
}