import PlayerCharacterCard from "./playercharacter-card";
import { api } from "~/trpc/server";

const PlayerCharacterList = async ({ campaignId }: { campaignId: string }) => {
  const data = await api.playerCharacters.list(campaignId);

  return (
    <>
      <div className="flex flex-wrap justify-center mt-10">
        {data && (data.map((playerCharacter) =>
          <PlayerCharacterCard key={playerCharacter.id} npc={playerCharacter} />
        )
        )}
      </div>
    </>
  );
};
export default PlayerCharacterList;