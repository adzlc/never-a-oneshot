
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { list } from "~/server/actions/campaignsessions";
import { format } from 'date-fns';

const CampaignSessionList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);


  return (
    <div className="flex flex-wrap justify-center mt-10">
      {data && (data.map((campaignSession) =>
        <Card>
          <CardHeader>
            <CardTitle>{campaignSession.name}</CardTitle>
            <CardDescription>{format(campaignSession.sessionDate, 'do LLLL yyyy')}</CardDescription>
          </CardHeader>
        </Card>
      )
      )}
    </div>
  );
};
export default CampaignSessionList;