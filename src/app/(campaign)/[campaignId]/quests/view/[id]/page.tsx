import { notFound } from "next/navigation";
import QuestView from "~/app/_components/quest/quest-view";
import { get } from "~/server/actions/quests";
interface PageProps {
  params: {
    id: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const quest = await get(params.id);
  if (!quest) {
    return notFound();
  }
  return (
    <>
      {quest && (
        <>
          <QuestView key={quest.id} quest={quest} />
        </>
      )
      }
    </>
  );
};

export default ViewPage;