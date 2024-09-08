import { revalidatePath } from "next/cache";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { list } from "~/server/actions/npcs";
import Link from "next/link";
import NpcCard from "./npc-card";

const NpcList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);


  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((npc) =>
        <NpcCard npc={npc} />
      )
      )}
    </div>
  );
};
export default NpcList;