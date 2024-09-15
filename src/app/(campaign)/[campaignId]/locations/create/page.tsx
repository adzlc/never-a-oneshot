import LocationForm from "~/app/_components/location/location-form";
import { LocationFormValues } from "~/data/typings";
import { create } from "~/server/actions/locations";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CreatePage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    async function createAction(data: LocationFormValues): Promise<string> {
        "use server";
        const id = await create(campaignId, data);
        return id ?? "";
    }
    return (
        <>
            <LocationForm campaignId={campaignId} submitAction={createAction} />
        </>
    );
};

export default CreatePage;