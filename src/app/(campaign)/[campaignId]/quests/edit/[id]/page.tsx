import { notFound } from "next/navigation";
import { deleteQuest, edit } from "~/server/actions/quests";
import { list as listQuestGivers } from "~/server/actions/npcs";
import QuestForm from "~/app/_components/quest/quest-form";
import { FieldValues } from "react-hook-form";
import { api } from "~/trpc/server";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const quest = await api.quests.get(params.id);

  if (!quest) {
    return notFound();
  }
  const questGivers = await listQuestGivers(params.campaignId)

  const submitAction = async (data: FieldValues) => {
    "use server"
    await edit(id, data)
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteQuest(params.campaignId, id);
  }

  return (
    <>
      {quest && (
        <>
          <QuestForm
            data={quest}
            questGivers={questGivers}
            campaignId={quest.campaignId}
            submitAction={submitAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;