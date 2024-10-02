"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import RichViewer from "~/components/ui/rich-text/rich-viewer";
import { type CampaignItem } from "~/data/typings";

const CampaignItemView = ({
  campaignItem,
}: {
  campaignItem: CampaignItem;
}) => {

  const router = useRouter();
  return (
    <>
      {campaignItem &&
        <>
          <Card>
            <CardHeader>
              <div className="flex-1 space-y-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <CardTitle>{campaignItem.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => router.push(`/${campaignItem.campaignId}/campaignitems/edit/${campaignItem.id}`)}>
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RichViewer content={campaignItem.description ?? ""} />
            </CardContent>
          </Card>
        </>
      }
    </>
  )
};

export default CampaignItemView;