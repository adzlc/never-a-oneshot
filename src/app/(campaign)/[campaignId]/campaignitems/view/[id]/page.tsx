import { notFound } from "next/navigation";
import CampaignItemView from "~/app/_components/campaignitem/campaignitem-view";
import { get } from "~/server/actions/campaignitems";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const campaignItem = await get(params.id);
  if (!campaignItem) {
    return notFound();
  }
  return (
    <>
      {campaignItem && (
        <>
          <CampaignItemView key={campaignItem.id} campaignItem={campaignItem} />
        </>
      )
      }
    </>
  );
};

export default ViewPage;