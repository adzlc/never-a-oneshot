import CampaignView from "~/app/_components/campaign/campaign-view";

interface PageProps {
  params: {
    campaignId: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <>
      <CampaignView campaignId={params.campaignId} />
    </>
  );
};
export default Page;
