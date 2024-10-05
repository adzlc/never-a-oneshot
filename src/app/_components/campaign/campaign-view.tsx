import { get } from "~/server/actions/campaign-actions";
import CampaignCard from "./campaign-card";

const CampaignView = async ({
  campaignId,
}: {
  campaignId: string;
}) => {

  const campaign = await get(campaignId);

  return (
    <>
      {campaign && <CampaignCard campaign={campaign} />}
    </>
  )
};

export default CampaignView;