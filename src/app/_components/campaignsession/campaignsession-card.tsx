"use client";
import { useRouter } from "next/navigation";
import { type CampaignSession } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const CampaignSessionCard = ({
  campaignSession,
  index,
}: {
  campaignSession: CampaignSession;
  index?: number;
}) => {
  const router = useRouter()

  return (
    <>
      <div className="p-4 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center mb-3 text-priamry">
                <div className="mr-3">
                  <Avatar className="bg-skeleton border-primary border-solid border-2 items-center justify-center">
                    <AvatarImage src={""} />
                    <AvatarFallback>{index}</AvatarFallback>
                  </Avatar>
                </div>
                {campaignSession.name}
              </div>
            </CardTitle>
            <CardDescription>{format(campaignSession.sessionDate, 'do LLLL yyyy')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  )
};

export default CampaignSessionCard;