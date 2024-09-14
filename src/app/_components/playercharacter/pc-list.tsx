import { list } from "~/server/actions/playercharacters";
import PlayerCharacterCard from "./playercharacter-card";

const PlayerCharacterList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);
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