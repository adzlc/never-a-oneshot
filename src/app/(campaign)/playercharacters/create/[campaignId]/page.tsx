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
        await create(data);
        redirect(`/playercharacters/${campaignId}`);
    }
    console.log("wtf");
    return (
        <>
            <h1 className="text-2xl font-bold">Create a Player character</h1>
            <div>
                <PlayerCharacterForm campaignId={campaignId} submitAction={createAction} />
            </div>
        </>
    );
};

export default PlayerCharacterPage;