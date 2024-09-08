import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Campaign } from "~/data/typings";
import { get } from "~/server/actions/campaigns";

const CampaignView = async ({
  campaign,
}: {
  campaign: Campaign;
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='text-primary'>
            {campaign.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="whitespace-break-spaces">
              {campaign.story}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
};

export default CampaignView;