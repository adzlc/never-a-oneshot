"use client";
import { useRouter } from "next/navigation";
import { type CampaignSession } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";

const CampaignSessionCard = ({
  campaignSession,
}: {
  campaignSession: CampaignSession;
}) => {
  const router = useRouter()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex-1 space-y-4 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <CardTitle>{campaignSession.name}</CardTitle>

              </div>
            </div>
          </CardTitle>
          <CardDescription>{format(campaignSession.sessionDate, 'do LLLL yyyy')}</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
};

export default CampaignSessionCard;