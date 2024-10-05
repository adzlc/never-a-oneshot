
import { get } from "~/server/actions/npc-actions";
import NpcView from "~/app/_components/npc/npc-view";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const npc = await get(params.id);

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