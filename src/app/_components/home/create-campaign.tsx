import Link from "next/link";
import { Suspense } from "react";
import { create, list } from "~/server/actions/campaigns";
import CampaignForm from "@/appcomponents/campaign/campaign-form";

export default async function CreateCampaign() {
  const campaigns = await list();
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <Suspense fallback={<p>Loading campaigns...</p>}>
          {campaigns?.map((campaign) => (
            <Link
              key={campaign.id}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-cyan-700 p-4 hover:bg-cyan-900"
              href={`/campaign/${campaign.id}`}
            >
              <h3 className="text-2xl font-bold text-white">
                {campaign.name} →
              </h3>
              <div className="text-lg text-white">
                {campaign.description}
              </div>
            </Link>
          ))}
        </Suspense>
      </div>
      <div className="w-full h-full max-w-xs">
        <CampaignForm submitAction={create} />
      </div>
    </>
  );
}
