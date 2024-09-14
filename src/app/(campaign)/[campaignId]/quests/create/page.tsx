import QuestForm from "~/app/_components/quest/quest-form";
import { QuestFormValues } from "~/data/typings";
import { create } from "~/server/actions/quests";
import { list as listQuestGivers } from "~/server/actions/npcs";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CampaignSessionPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;
    const questGivers = await listQuestGivers(campaignId)

    async function createAction(data: QuestFormValues): Promise<string> {
        "use server";
        const id = await create(campaignId, data);
        return id ?? "";
    }
    return (
        <>
            <QuestForm questGivers={questGivers} campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default CampaignSessionPage;