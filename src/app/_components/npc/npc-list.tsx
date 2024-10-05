import NpcCard from "~/app/_components/npc/npc-card";
import { api } from "~/trpc/server";

const NpcList = async ({ campaignId }: { campaignId: string }) => {
  const data = await api.npcs.list(campaignId);


  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((npc) =>
        <NpcCard key={npc.id} npc={npc} />
      )
      )}
    </div>
  );
};
export default NpcList;