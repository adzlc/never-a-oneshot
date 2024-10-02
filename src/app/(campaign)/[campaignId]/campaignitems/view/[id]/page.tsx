import { notFound } from "next/navigation";
import CampaignItemView from "~/app/_components/campaignitem/campaignitem-view";
import { api } from "~/trpc/server";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignItem = await api.campaignItems.get({ id });
  if (!campaignItem) {
    return notFound();
  }
  return (
    <>
      {campaignItem && (
        <CampaignItemView key={campaignItem.id} campaignItem={campaignItem} />
      )
      }
    </>
  );
};

export default ViewPage;