import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <CampaignMainLayout campaignId={params.id} children={children} />
  );
}
