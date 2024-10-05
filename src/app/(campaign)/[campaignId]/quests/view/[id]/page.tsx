import { notFound } from "next/navigation";
import QuestView from "~/app/_components/quest/quest-view";
import { api } from "~/trpc/server";
interface PageProps {
  params: {
    id: string;
  };
}

const ViewPage = async ({ params }: PageProps) => {
  const quest = await api.quests.get(params.id);
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