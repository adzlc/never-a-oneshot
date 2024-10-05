import { notFound } from "next/navigation";
import { deleteLocation, edit } from "~/server/actions/location-actions";
import LocationForm from "~/app/_components/location/location-form";
import { api } from "~/trpc/server";
import { FieldValues } from "react-hook-form";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const location = await api.locations.get(id);

  const submitAction = async (data: FieldValues) => {
    "use server"
    await edit(id, data)
  }
  async function deleteAction(id: string) {
    "use server";
    await deleteLocation(params.campaignId, id);
  }

  if (!location) {
    return notFound();
  }
  return (
    <>
      <LocationForm
        data={location}
        campaignId={location.campaignId}
        submitAction={submitAction}
        deleteAction={deleteAction}
      />
    </>
  );
};

export default EditPage;