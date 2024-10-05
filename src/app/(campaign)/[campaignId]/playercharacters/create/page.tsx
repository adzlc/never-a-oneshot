import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import PlayerCharacterForm from "~/app/_components/playercharacter/playerchracter-form";
import { create } from "~/server/actions/player-character-actions";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const PlayerCharacterPage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    const submitAction = async (data: FieldValues) => {
        "use server"
        console.log("Hello", campaignId, data);
        await create(campaignId, data);
        // For some reason the redirect must be done here for create, otherwise it throws an error.
        redirect(`/${campaignId}/playercharacters`);
    }
    return (
        <>
            <PlayerCharacterForm campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default PlayerCharacterPage;