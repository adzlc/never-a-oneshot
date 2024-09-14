import { CampaignSessionFormValues } from "~/data/typings";
import { deletecampaignSession, edit, get } from "~/server/actions/campaignsessions";
import { redirect } from "next/navigation";
import CampaignSessionForm from "~/app/_components/campaignsession/campaignsession-form";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignSession = await get(id);

  async function editAction(data: CampaignSessionFormValues): Promise<string> {
    "use server";
    await edit(id, data);
    return id;
  }

  async function deleteAction(id: string) {
    "use server";
    await deletecampaignSession(id);
    redirect(`/${params.campaignId}/campaignsessions`);
  }

  if (!campaignSession) {
    return;
  }
  return (
    <>
      {campaignSession && (
        <>
          <CampaignSessionForm
            data={campaignSession}
            campaignId={campaignSession.campaignId}
            submitAction={editAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;