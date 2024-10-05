import { deleteNpc, edit } from "~/server/actions/npc-actions";
import { notFound } from "next/navigation";
import NpcForm from "~/app/_components/npc/npc-form";
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
  const npc = await api.npcs.get(id);

  if (!npc) {
    return notFound();
  }

  const submitAction = async (data: FieldValues) => {
    "use server"
    await edit(id, data)
  }
  async function deleteAction(id: string) {
    "use server";
    await deleteNpc(params.campaignId, id);
  }

  return (
    <>
      {npc && (
        <>
          <NpcForm
            data={npc}
            campaignId={npc.campaignId}
            submitAction={submitAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;