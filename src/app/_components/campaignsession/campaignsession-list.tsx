
import CampaignSessionCard from "~/app/_components/campaignsession/campaignsession-card";
import Link from "next/link";
import { api } from "~/trpc/server";

const CampaignSessionList = async ({ campaignId }: { campaignId: string }) => {
  const data = await api.campaignSessions.list({ campaignId: campaignId });

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((campaignSession, index) =>
        <Link key={campaignSession.id} href={`/${campaignId}/campaignsessions/view/${campaignSession.id}`}>
          <CampaignSessionCard key={campaignSession.id} index={index + 1} campaignSession={campaignSession} />
        </Link>
      )
      )}
    </div>
  );
};
export default CampaignSessionList;