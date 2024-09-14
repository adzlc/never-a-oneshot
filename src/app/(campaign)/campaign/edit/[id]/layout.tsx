import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";
import CentreLayout from "~/app/_components/layouts/centre-layout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <CampaignMainLayout campaignId={params.id}>
      <CentreLayout>{children}</CentreLayout>
    </CampaignMainLayout>
  );
}
