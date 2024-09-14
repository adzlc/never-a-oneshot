import CampaignItemForm from "~/app/_components/campaignitem/campaignitem-form";
import { CampaignItemFormValues } from "~/data/typings";
import { create } from "~/server/actions/campaignitems";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CampaignSessionPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    async function createAction(data: CampaignItemFormValues): Promise<string> {
        "use server";
        const id = await create(campaignId, data);
        return id ?? "";
    }
    return (
        <>
            <CampaignItemForm campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default CampaignSessionPage;