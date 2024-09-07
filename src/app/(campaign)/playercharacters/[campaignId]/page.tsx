import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PlayerCharacterList from "./pc-list";

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
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Player Characters</h2>
          <PlayerCharacterList campaignId={params.campaignId} />
        </div>
      </Suspense>
    </>
  );
};

export default PlayerCharacterListPage;