import { type Quest } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BooleanView from "../ui/boolean-view";


const QuestCard = ({
  quest,
}: {
  quest: Quest;
}) => {

  return (
    <>
      <div className="p-4 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              {quest.name}
            </CardTitle>
            <CardDescription><BooleanView value={quest.complete} /></CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
    </>
  )
};

export default QuestCard;