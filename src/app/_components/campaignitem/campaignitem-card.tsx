"use client";
import { type CampaignItem } from "~/data/typings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import RichViewer from "~/components/ui/rich-text/rich-viewer";

const CampaignItemCard = ({
  campaignItem,
}: {
  campaignItem: CampaignItem;
}) => {

  return (
    <>
      <div className="p-4 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>
              {campaignItem.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RichViewer content={campaignItem.description ?? ""} />
          </CardContent>
        </Card>
      </div>
    </>
  )
};

export default CampaignItemCard;