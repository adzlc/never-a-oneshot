import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";
import CentreLayout from "~/app/_components/layouts/centre-layout";
import { Toaster } from "~/components/ui/toaster";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { campaignId: string };
}) {
  return (
    <CampaignMainLayout campaignId={params.campaignId}>
      <CentreLayout>
        {children}
        <Toaster />
      </CentreLayout>
    </CampaignMainLayout>
  );
}
