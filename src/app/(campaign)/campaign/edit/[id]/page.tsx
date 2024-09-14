import {
  deleteCampaign,
  editCampaign,
  get,
} from "~/server/actions/campaigns";
import CampaignForm from "@/appcomponents/campaign/campaign-form";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { type CampaignFormValues } from "~/data/typings";

interface PageProps {
  params: {
    id: string;
  };
}

const EditNeighbourhoodPage = async ({ params }: PageProps) => {
  const campaignId = params.id;

  async function deleteAction(id: string) {
    "use server";
    await deleteCampaign(id);
    redirect('/');
  }
  async function editAction(data: CampaignFormValues) {
    "use server";
    await editCampaign(campaignId, data);
    redirect(`/campaign/${campaignId}`);
  }

  const campaign = await get(campaignId);
  return (
    <>
      <Suspense fallback={"Loading campaign"}>
        <CampaignForm data={campaign} submitAction={editAction} deleteAction={deleteAction} />
      </Suspense>
    </>
  );
};
export default EditNeighbourhoodPage;
