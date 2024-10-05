"use server";
import MainLayout from "./main-layout";

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
