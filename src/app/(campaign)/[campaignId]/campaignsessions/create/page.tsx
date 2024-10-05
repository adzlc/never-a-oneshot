import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import CampaignSessionForm from "~/app/_components/campaignsession/campaignsession-form";
import { toast } from "~/hooks/use-toast";
import { create } from "~/server/actions/campaignsessions";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CampaignSessionPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    const submitAction = async (data: FieldValues) => {
        "use server"
        await create(campaignId, data);
        // For some reason the redirect must be done here for create, otherwise it throws an error.
        redirect(`/${campaignId}/campaignsessions`);
    }

    return (
        <>
            <CampaignSessionForm campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default CampaignSessionPage;