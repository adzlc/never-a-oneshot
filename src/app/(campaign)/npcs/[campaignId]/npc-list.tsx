import { revalidatePath } from "next/cache";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { list } from "~/server/actions/npcs";
import Link from "next/link";

const NpcList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);


  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data && (data.map((npc) =>
          <>
            <Link href={`/npcs/edit/${npc.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{npc.name}</CardTitle>
                  <CardDescription>{npc.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Allegiance</dt>
                    <dd className="text-sm text-gray-500">{npc.allegiance}</dd>
                    <dt className="sr-only">Race</dt>
                    <dd className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {npc.race}
                      </span>
                    </dd>
                  </dl>
                </CardContent>
              </Card>
            </Link>
          </>
        )
        )}
      </div>
    </>
  );
};
export default NpcList;