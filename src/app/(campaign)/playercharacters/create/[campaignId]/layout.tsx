import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { campaignId: string };
}) {
    return (
        <CampaignMainLayout campaignId={params.campaignId} children={children} />
    );
}
