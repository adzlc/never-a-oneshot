import CampaignView from "~/app/_components/campaign/campaign-view";

interface PageProps {
  params: {
    id: string;
  };
}

const EditNeighbourhoodPage = ({ params }: PageProps) => {
  const campaignId = params.id;

  return (
    <>
      <CampaignView campaignId={campaignId} />
    </>
  );
};
export default EditNeighbourhoodPage;
