import { notFound } from "next/navigation";
import LocationView from "~/app/_components/location/location-view";
import { api } from "~/trpc/server";

interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const location = await api.locations.get(params.id);
  if (!location) {
    return notFound();
  }
  return (
    <>
      <LocationView key={location.id} location={location} />
    </>
  );
};

export default ViewPage;