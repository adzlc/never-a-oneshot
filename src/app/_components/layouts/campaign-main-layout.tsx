"use server";
import { get } from "~/server/actions/campaigns";
import MainLayout from "./main-layout";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function CampaignMainLayout({
  children,
  campaignId,
}: {
  children: React.ReactNode;
  campaignId: string;
}) {
  const campaign = await get(campaignId);

  return (
    <Suspense fallback={<Skeleton />}>
      {campaign && (
        <MainLayout children={children} campaign={campaign} />
      )}
    </Suspense>
  );
}
