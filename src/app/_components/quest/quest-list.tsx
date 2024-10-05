
import Link from "next/link";
import QuestCard from "./quest-card";
import { api } from "~/trpc/server";

const QuestList = async ({ campaignId }: { campaignId: string }) => {
  const data = await api.quests.list(campaignId);

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((quest) =>
        <Link key={quest.id} href={`/${campaignId}/quests/view/${quest.id}`}>
          <QuestCard key={quest.id} quest={quest} />
        </Link>
      )
      )}
    </div>
  );
};
export default QuestList;