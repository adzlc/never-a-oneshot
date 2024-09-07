import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";
import CentreLayout from "@/appcomponents/layouts/centre-layout";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { campaignId: string };
}) {
    return (
        <CampaignMainLayout campaignId={params.campaignId}>
            <div className="ml-4 mr-4">
                {children}
            </div>
        </CampaignMainLayout>
    );
}
