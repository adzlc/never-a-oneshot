import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";
import CampaignItemForm from "~/app/_components/campaignitem/campaignitem-form";
import { create } from "~/server/actions/campaignitems";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CampaignSessionPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    const submitAction = async (data: FieldValues) => {
        "use server"
        create(campaignId, data);
        revalidatePath(`/`);
    }
    return (
        <>
            <CampaignItemForm campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default CampaignSessionPage;