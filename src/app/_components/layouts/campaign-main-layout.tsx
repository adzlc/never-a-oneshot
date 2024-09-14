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

  return (
    <MainLayout children={children} campaignId={campaignId} />
  );
}
