
import { list } from "~/server/actions/campaignsessions";
import CampaignSessionCard from "~/app/_components/campaignsession/campaignsession-card";
import Link from "next/link";

const CampaignSessionList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);

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