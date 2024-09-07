import { redirect } from "next/navigation";
import NpcForm from "~/app/_components/npc/npc-form";
import { NpcFormValues } from "~/data/typings";
import { create } from "~/server/actions/npcs";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const NpcPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    async function createAction(data: NpcFormValues) {
        "use server";
        await create(campaignId, data);
        redirect(`/npcs/${campaignId}`);
    }
    return (
        <>
            <NpcForm campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default NpcPage;