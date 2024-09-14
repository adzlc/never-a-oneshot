import { PlayerCharacterFormValues } from "~/data/typings";
import { deletePlayerCharacter, edit, get } from "~/server/actions/playercharacters";
import PlayerCharacterForm from "@/appcomponents/playercharacter/playerchracter-form";
import { redirect } from "next/navigation";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const PlayerCharacterEditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignId = params.campaignId;
  const playerCharacter = await get(id);

  async function editAction(data: PlayerCharacterFormValues): Promise<string> {
    "use server";
    return await edit(id, data);
  }
  async function deleteAction(id: string) {
    "use server";
    await deletePlayerCharacter(id);
    redirect(`/${campaignId}/playercharacters`);
  }
  if (!playerCharacter) {
    return;
  }
  return (
    <>
      {playerCharacter && (
        <>
          <PlayerCharacterForm
            key={playerCharacter.id}
            data={playerCharacter}
            campaignId={campaignId}
            submitAction={editAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default PlayerCharacterEditPage;