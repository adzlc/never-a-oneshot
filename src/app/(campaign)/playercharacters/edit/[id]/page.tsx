import { PlayerCharacterFormValues } from "~/data/typings";
import { deletePlayerCharacter, edit, get } from "~/server/actions/playercharacters";
import EditPlayerChracter from "./edit-form";
import { redirect } from "next/navigation";
interface PageProps {
  params: {
    id: string;
  };
}

const PlayerCharacterEditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const playerCharacter = await get(id);

  async function editAction(data: PlayerCharacterFormValues) {
    "use server";
    await edit(id, data);
  }
  async function deleteAction(id: string) {
    "use server";
    await deletePlayerCharacter(id);
    redirect(`/playercharacters/${playerCharacter?.campaignId}`);
  }
  if (!playerCharacter) {
    return;
  }
  return (
    <>
      {playerCharacter && (
        <>
          <EditPlayerChracter data={playerCharacter} editFunction={editAction} />
        </>
      )}
    </>
  );
};

export default PlayerCharacterEditPage;