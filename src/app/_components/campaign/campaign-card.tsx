"use client";
import { useRouter } from "next/navigation";
import { Campaign } from "~/data/typings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import RichViewer from "~/components/ui/rich-text/rich-viewer";
import { Button } from "~/components/ui/button";

const CampaignCard = ({
  campaign,
}: {
  campaign: Campaign;
}) => {
  const router = useRouter()

  return (
    <>
      <Card>
        <CardHeader className="flex">
          <div className="flex-1 space-y-4 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <CardTitle>{campaign.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Button onClick={() => router.push(`/campaign/edit/${campaign.id}`)}>
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RichViewer content={campaign.story ?? ""} />
        </CardContent>
      </Card>
    </>
  )
};

export default CampaignCard;