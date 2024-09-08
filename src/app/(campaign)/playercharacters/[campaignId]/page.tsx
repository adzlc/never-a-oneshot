import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PlayerCharacterList from "./pc-list";
import { Button } from "~/components/ui/button";
import Link from "next/link";

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
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-primary">Player Characters</h2>
              <div className="flex items-center space-x-2">
                <Button asChild>
                  <Link href={`/playercharacters/create/${params.campaignId}`}>Create</Link>
                </Button>
              </div>
            </div>
          </div>
          <PlayerCharacterList campaignId={params.campaignId} />
        </div>
      </Suspense>
    </>
  );
};

export default PlayerCharacterListPage;