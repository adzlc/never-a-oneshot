import { notFound } from "next/navigation";
import CampaignItemForm from "~/app/_components/campaignitem/campaignitem-form";
import { api } from "~/trpc/server";
import { FieldValues } from "react-hook-form";
import { deleteCampaignItem, edit } from "~/server/actions/campaignitems";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const campaignItem = await api.campaignItems.get({ id });
  if (!campaignItem) {
    return notFound();
  }

  const submitAction = async (data: FieldValues) => {
    "use server"
    await edit(id, data)
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteCampaignItem(params.campaignId, id);
  }

  return (
    <>
      {campaignItem && (
        <>
          <CampaignItemForm
            data={campaignItem}
            campaignId={campaignItem.campaignId}
            submitAction={submitAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;