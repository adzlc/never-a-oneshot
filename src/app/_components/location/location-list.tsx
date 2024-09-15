
import { list } from "~/server/actions/locations";
import Link from "next/link";
import LocationCard from "./location-card";

const LocationList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((location) =>
        <Link key={location.id} href={`/${campaignId}/locations/view/${location.id}`}>
          <LocationCard key={location.id} location={location} />
        </Link>
      )
      )}
    </div>
  );
};
export default LocationList;