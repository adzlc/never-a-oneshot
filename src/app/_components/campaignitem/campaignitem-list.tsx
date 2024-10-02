import CampaignItemCard from "~/app/_components/campaignitem/campaignitem-card";
import Link from "next/link";
import { api } from "~/trpc/server";

const CampaignItemList = async ({ campaignId }: { campaignId: string }) => {
  const data = await api.campaignItems.list({ campaignId });

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((campaignItem) =>
        <Link key={campaignItem.id} href={`/${campaignId}/campaignitems/view/${campaignItem.id}`}>
          <CampaignItemCard key={campaignItem.id} campaignItem={campaignItem} />
        </Link>
      )
      )}
    </div>
  );
};
export default CampaignItemList;