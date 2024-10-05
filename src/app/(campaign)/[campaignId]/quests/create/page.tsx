import QuestForm from "~/app/_components/quest/quest-form";
import { create } from "~/server/actions/quests";
import { list as listQuestGivers } from "~/server/actions/npcs";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const QuestsPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;
    const questGivers = await listQuestGivers(campaignId)

    const submitAction = async (data: FieldValues) => {
        "use server"
        await create(campaignId, data);
        // For some reason the redirect must be done here for create, otherwise it throws an error.
        redirect(`/${campaignId}/quests`);
    }
    return (
        <>
            <QuestForm questGivers={questGivers} campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default QuestsPage;