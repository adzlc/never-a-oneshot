import CampaignMainLayout from "@/appcomponents/layouts/campaign-main-layout";
import CentreLayout from "@/appcomponents/layouts/centre-layout";
import { get } from "~/server/actions/playercharacters";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const playerCharacter = await get(params.id);
    return (
        playerCharacter && (
            <CampaignMainLayout campaignId={playerCharacter.campaignId}>
                <CentreLayout>
                    {children}
                </CentreLayout>
            </CampaignMainLayout>
        )
    );
}
