import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import LocationList from "~/app/_components/location/location-list";

interface PageProps {
  params: {
    campaignId: string;
  };
}

const LocationListPage = async ({ params }: PageProps) => {
  const campaignId = params.campaignId;
  return (
    <>
      <div className="mt-4 w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-primary">Campaign Locations</h2>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href={`/${campaignId}/locations/create`}>Create</Link>
              </Button>
            </div>
          </div>
        </div>
        <Suspense fallback={<Skeleton className="w-full h-96 rounded-xl" />}>
          <LocationList campaignId={campaignId} />
        </Suspense >
      </div>
    </>
  );
};

export default LocationListPage;