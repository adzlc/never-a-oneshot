import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NpcList from "./npc-list";


interface PageProps {
  params: {
    campaignId: string;
  };
}

const PlayerCharacterListPage = async ({ params }: PageProps) => {


  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">NPCs</h2>
          <NpcList campaignId={params.campaignId} />
        </div>
      </Suspense>
    </>
  );
};

export default PlayerCharacterListPage;