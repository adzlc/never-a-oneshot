import { redirect } from "next/navigation";
import PlayerCharacterForm from "~/app/_components/playercharacter/playerchracter-form";
import { PlayerCharacterFormValues } from "~/data/typings";
import { create } from "~/server/actions/playercharacters";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const PlayerCharacterPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    async function createAction(data: PlayerCharacterFormValues) {
        "use server";
        return await create(campaignId, data);
    }
    return (
        <>
            <PlayerCharacterForm campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default PlayerCharacterPage;