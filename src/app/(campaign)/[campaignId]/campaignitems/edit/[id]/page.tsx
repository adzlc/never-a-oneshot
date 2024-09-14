import { type CampaignItemFormValues } from "~/data/typings";
import { deletecampaignItem, edit, get } from "~/server/actions/campaignitems";
import { notFound, redirect } from "next/navigation";
import CampaignItemForm from "~/app/_components/campaignitem/campaignitem-form";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignItem = await get(id);

  async function editAction(data: CampaignItemFormValues): Promise<string> {
    "use server";
    await edit(id, data);
    return id;
  }

  async function deleteAction(id: string) {
    "use server";
    await deletecampaignItem(id);
    redirect(`/${params.campaignId}/campaignitems`);
  }

  if (!campaignItem) {
    return notFound();
  }
  return (
    <>
      {campaignItem && (
        <>
          <CampaignItemForm
            data={campaignItem}
            campaignId={campaignItem.campaignId}
            submitAction={editAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;