import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import NpcForm from "~/app/_components/npc/npc-form";
import { create } from "~/server/actions/npc-actions";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const NpcPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    const submitAction = async (data: FieldValues) => {
        "use server"
        await create(campaignId, data);
        // For some reason the redirect must be done here for create, otherwise it throws an error.
        redirect(`/${campaignId}/npcs`);
    }
    return (
        <>
            <NpcForm campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default NpcPage;