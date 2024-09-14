"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import RichViewer from "~/components/ui/rich-text/rich-viewer";
import { Button } from "~/components/ui/button";
import { type Quest } from "~/data/typings";
import { useRouter } from "next/navigation";

const QuestView = ({
  quest,
}: {
  quest: Quest;
}) => {
  const router = useRouter();

  return (
    <>
      {quest &&
        <>
          <Card>
            <CardHeader>
              <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <CardTitle>{quest.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => router.push(`/${quest.campaignId}/quests/edit/${quest.id}`)}>
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <CardDescription>

              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichViewer content={quest.description ?? ""} />
            </CardContent>
          </Card>
        </>
      }
    </>
  )
};

export default QuestView;