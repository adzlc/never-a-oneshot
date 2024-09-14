
import { get } from "~/server/actions/npcs";
import NpcView from "~/app/_components/npc/npc-view";
interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const npc = await get(params.id);

  if (!npc) {
    return <></>;
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