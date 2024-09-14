import { NpcFormValues } from "~/data/typings";
import { deleteNpc, edit, get } from "~/server/actions/npcs";
import { redirect } from "next/navigation";
import NpcForm from "~/app/_components/npc/npc-form";
import { toast } from "~/hooks/use-toast";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const npc = await get(id);

  async function editAction(data: NpcFormValues): Promise<string> {
    "use server";
    await edit(id, data);
    return id;
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteNpc(id);
    redirect(`/${params.campaignId}/npcs`);
  }

  if (!npc) {
    return;
  }
  return (
    <>
      {npc && (
        <>
          <NpcForm
            data={npc}
            campaignId={npc.campaignId}
            submitAction={editAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;