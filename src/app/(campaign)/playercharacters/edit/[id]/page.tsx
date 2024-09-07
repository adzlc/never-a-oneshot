import { PlayerCharacterFormValues } from "~/data/typings";
import { edit, get } from "~/server/actions/playercharacters";
import EditPlayerChracter from "./edit-form";
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