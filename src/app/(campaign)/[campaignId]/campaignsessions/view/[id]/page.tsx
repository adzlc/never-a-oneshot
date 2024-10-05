

import { notFound } from "next/navigation";
import CampaignSessionView from "~/app/_components/campaignsession/campaignsession-view";
import { api } from "~/trpc/server";
interface PageProps {
  params: {
    id: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const campaignSession = await api.campaignSessions.get({ id: params.id });
  if (!campaignSession) {
    return notFound();
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