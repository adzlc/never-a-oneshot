import { PlayerCharacterFormValues } from "~/data/typings";
import PlayerCharacterForm from "@/appcomponents/playercharacter/playerchracter-form";
import { notFound, redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { FieldValues } from "react-hook-form";
import { editCampaign } from "~/server/actions/campaign-actions";
import { deletePlayerCharacter, edit } from "~/server/actions/player-character-actions";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const PlayerCharacterEditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignId = params.campaignId;
  const playerCharacter = await api.playerCharacters.get(id);
  if (!playerCharacter) {
    return notFound();
  }

  const submitAction = async (data: FieldValues) => {
    "use server"
    await edit(id, data)
  }
  async function deleteAction(id: string) {
    "use server";
    await deletePlayerCharacter(params.campaignId, id);
  }

  return (
    <>
      {playerCharacter && (
        <>
          <PlayerCharacterForm
            key={playerCharacter.id}
            data={playerCharacter}
            campaignId={campaignId}
            submitAction={submitAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default PlayerCharacterEditPage;