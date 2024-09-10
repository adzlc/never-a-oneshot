import { redirect } from "next/navigation";
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

    async function createAction(data: CampaignSessionFormValues) {
        "use server";
        await create(campaignId, data);
        redirect(`/campaignsessions/${campaignId}`);
    }
    return (
        <>
            <CampaignSessionForm campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default CampaignSessionPage;