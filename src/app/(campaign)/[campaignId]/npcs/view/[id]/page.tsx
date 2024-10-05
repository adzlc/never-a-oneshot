
import NpcView from "~/app/_components/npc/npc-view";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const npc = await api.npcs.get(params.id);

  if (!npc) {
    return notFound();
  }
  return (
    <>
      {npc && (
        <>
          <NpcView key={npc.id} npc={npc} />
        </>
      )
      }
    </>
  );
};

export default EditPage;