import { deleteCampaignSession, edit } from "~/server/actions/campaignsessions";
import { notFound } from "next/navigation";
import CampaignSessionForm from "~/app/_components/campaignsession/campaignsession-form";
import { api } from "~/trpc/server";
import { FieldValues } from "react-hook-form";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignSession = await api.campaignSessions.get({ id: params.id });
  if (!campaignSession) {
    return notFound();
  }

  const submitAction = async (data: FieldValues) => {
    "use server"
    await edit(id, data)
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteCampaignSession(params.campaignId, id);
  }
  return (
    <>
      {campaignSession && (
        <>
          <CampaignSessionForm
            data={campaignSession}
            campaignId={campaignSession.campaignId}
            submitAction={submitAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;