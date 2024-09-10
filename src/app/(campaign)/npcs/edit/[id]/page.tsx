import { NpcFormValues } from "~/data/typings";
import { deleteNpc, edit, get } from "~/server/actions/npcs";
import EditForm from "./edit-form";
import { redirect } from "next/navigation";
interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const npc = await get(id);
  const campaignId = npc?.campaignId;

  async function editAction(data: NpcFormValues) {
    "use server";
    await edit(id, data);
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteNpc(id);
    redirect(`/npcs/${npc?.campaignId}`);
  }

  if (!npc) {
    return;
  }
  return (
    <>
      {npc && (
        <>
          <EditForm data={npc} editFunction={editAction} deleteAction={deleteAction} />
        </>
      )}
    </>
  );
};

export default EditPage;