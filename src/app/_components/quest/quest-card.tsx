import { type QuestAll } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FaCheckCircle, FaCoins, FaTimesCircle } from "react-icons/fa";
import BooleanView from "../ui/boolean-view";
import { FaUserGroup } from "react-icons/fa6";


const QuestCard = ({
  quest,
}: {
  quest: QuestAll;
}) => {
  return (
    <>
      <div className="p-4 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              {quest.name}
              <CardDescription>

              </CardDescription>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-1 gap-1">
              <FaCoins className="flex-start" /><div className="flex-end" >{quest.goldReward}</div>
            </div>
            <div className="flex flex-1 gap-1">
              <div className="flex-start">Complete </div><div className="flex-end" ><BooleanView value={quest.complete} /></div>
            </div>
            <div className="flex flex-1 gap-1">
              <FaUserGroup className="flex-start" /><div className="flex-end" >{quest.questGiver?.name}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
};

export default QuestCard;