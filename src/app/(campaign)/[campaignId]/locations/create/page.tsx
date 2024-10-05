import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import LocationForm from "~/app/_components/location/location-form";
import { create } from "~/server/actions/location-actions";
interface PageProps {
    params: {
        campaignId: string;
    };
}

const CreatePage = async ({ params }: PageProps) => {
    const campaignId = params.campaignId;

    const submitAction = async (data: FieldValues) => {
        "use server"
        await create(campaignId, data);
        // For some reason the redirect must be done here for create, otherwise it throws an error.
        redirect(`/${campaignId}/locations`);
    }
    return (
        <>
            <LocationForm campaignId={campaignId} submitAction={submitAction} />
        </>
    );
};

export default CreatePage;