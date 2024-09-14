"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import RichViewer from "~/components/ui/rich-text/rich-viewer";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { CampaignSession } from "~/data/typings";
import { useRouter } from "next/navigation";

const CampaignSessionView = async ({
  campaignSession,
}: {
  campaignSession: CampaignSession;
}) => {
  const router = useRouter();

  return (
    <>
      {campaignSession &&
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex-1 space-y-4 pt-6">
                  <div className="flex items-center justify-between space-y-2">
                    <CardTitle>{campaignSession.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => router.push(`/${campaignSession.campaignId}/campaignsessions/edit/${campaignSession.id}`)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>{format(campaignSession.sessionDate, 'do LLLL yyyy')}</CardDescription>
            </CardHeader>
            <CardContent>
              <RichViewer content={campaignSession.overview ?? ""} />
            </CardContent>
          </Card>
        </>
      }
    </>
  )
};

export default CampaignSessionView;