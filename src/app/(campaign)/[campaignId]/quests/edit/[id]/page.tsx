import { QuestFormValues } from "~/data/typings";
import { notFound, redirect } from "next/navigation";
import { deleteQuest, edit, get } from "~/server/actions/quests";
import { list as listQuestGivers } from "~/server/actions/npcs";
import QuestForm from "~/app/_components/quest/quest-form";
interface PageProps {
  params: {
    id: string;
    campaignId: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const quest = await get(id);
  const questGivers = await listQuestGivers(params.campaignId)

  async function editAction(data: QuestFormValues): Promise<string> {
    "use server";
    await edit(id, data);
    return id;
  }

  async function deleteAction(id: string) {
    "use server";
    await deleteQuest(id);
    redirect(`/${params.campaignId}/quests`);
  }

  if (!quest) {
    return notFound();
  }
  return (
    <>
      {quest && (
        <>
          <QuestForm
            data={quest}
            questGivers={questGivers}
            campaignId={quest.campaignId}
            submitAction={editAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditPage;