

import CampaignSessionView from "~/app/_components/campaignsession/campaignsession-view";
import { get } from "~/server/actions/campaignsessions";
interface PageProps {
  params: {
    id: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const campaignSession = await get(params.id);
  if (!campaignSession) {
    return <></>;
  }
  return (
    <>
      {campaignSession && (
        <>
          <CampaignSessionView key={campaignSession.id} campaignSession={campaignSession} />
        </>
      )
      }
    </>
  );
};

export default ViewPage;