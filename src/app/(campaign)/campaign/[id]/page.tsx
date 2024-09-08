import {
  get,
} from "~/server/actions/campaigns";
import { Suspense } from "react";
import CampaignView from "~/app/_components/campaign/campaign-view";

interface PageProps {
  params: {
    id: string;
  };
}

const EditNeighbourhoodPage = async ({ params }: PageProps) => {
  const campaignId = params.id;

  const campaign = await get(campaignId);
  return (
    <>
      <Suspense fallback={"Loading campaign"}>
        {campaign && <CampaignView campaign={campaign} />}
      </Suspense>
    </>
  );
};
export default EditNeighbourhoodPage;
