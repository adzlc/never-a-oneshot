import CampaignSessionForm from "~/app/_components/campaignsession/campaignsession-form";
import { CampaignSessionFormValues } from "~/data/typings";
import { create } from "~/server/actions/campaignsessions";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CampaignSessionPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    async function createAction(data: CampaignSessionFormValues): Promise<string> {
        "use server";
        const id = await create(campaignId, data);
        return id ?? "";
    }
    return (
        <>
            <CampaignSessionForm campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default CampaignSessionPage;