import { LocationFormValues } from "~/data/typings";
import { notFound, redirect } from "next/navigation";
import { deleteLocation, edit, get } from "~/server/actions/location-actions";
import LocationForm from "~/app/_components/location/location-form";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const location = await get(id);

  async function editAction(data: LocationFormValues): Promise<string> {
    "use server";
    await edit(id, data);
    return id;
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteLocation(id);
    redirect(`/${params.campaignId}/locations`);
  }

  if (!location) {
    return notFound();
  }
  return (
    <>
      <LocationForm
        data={location}
        campaignId={location.campaignId}
        submitAction={editAction}
        deleteAction={deleteAction}
      />
    </>
  );
};

export default EditPage;