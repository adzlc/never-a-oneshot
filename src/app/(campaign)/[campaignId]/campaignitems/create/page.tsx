import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import CampaignItemForm from "~/app/_components/campaignitem/campaignitem-form";
import { create } from "~/server/actions/campaign-item-actions";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CampaignItemPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    const submitAction = async (data: FieldValues) => {
        "use server"
        create(campaignId, data);
        // For some reason the redirect must be done here for create, otherwise it throws an error.
        redirect(`/${campaignId}/campaignitems`);
    }
    return (
        <>
            <CampaignItemForm campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default CampaignItemPage;