import {
  deleteCampaign,
  editCampaign,
  get,
} from "~/server/actions/campaign-actions";
import CampaignForm from "@/appcomponents/campaign/campaign-form";
import { redirect } from "next/navigation";
import { type CampaignFormValues } from "~/data/typings";

interface PageProps {
  params: {
    campaignId: string;
  };
}

const EditNeighbourhoodPage = async ({ params }: PageProps) => {
  const campaignId = params.campaignId;

  async function deleteAction(id: string) {
    "use server";
    await deleteCampaign(id);
    redirect('/');
  }
  async function editAction(data: CampaignFormValues) {
    "use server";
    return await editCampaign(campaignId, data);
  }

  const campaign = await get(campaignId);
  return (
    <>
      <CampaignForm data={campaign} submitAction={editAction} deleteAction={deleteAction} />
    </>
  );
};
export default EditNeighbourhoodPage;
