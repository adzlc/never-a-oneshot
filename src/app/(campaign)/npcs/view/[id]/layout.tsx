import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";
import CentreLayout from "@/appcomponents/layouts/centre-layout";
import { get } from "~/server/actions/npcs";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const npc = await get(params.id);
    return (
        npc && (
            <CampaignMainLayout campaignId={npc.campaignId}>
                <CentreLayout>
                    {children}
                </CentreLayout>
            </CampaignMainLayout>
        )
    );
}
