import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CampaignSessionList from "./campaignsession-list";
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
      <div className="mt-4 w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Campaign Sessions</h2>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href={`/campaignsessions/create/${params.campaignId}`}>Create</Link>
              </Button>
            </div>
          </div>
        </div>
        <Suspense fallback={<Skeleton />}>
          <CampaignSessionList campaignId={params.campaignId} />
        </Suspense >
      </div>
    </>
  );
};

export default PlayerCharacterListPage;