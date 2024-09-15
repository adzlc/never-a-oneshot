"use client";
import { useRouter } from "next/navigation";
import { type Npc } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { HiOutlineUserGroup } from "react-icons/hi2";
import RingContent from "../ui/ring-content";
import { Button } from "~/components/ui/button";
import RichViewer from "~/components/ui/rich-text/rich-viewer";


const NpcView = ({
  npc,
}: {
  npc: Npc;
}) => {
  const router = useRouter()

  return (
    <>
      <Card>
        <CardContent>
          <div className="grid grid-rows-4 grid-flow-col gap-4 mt-4">
            {npc.imageUrl && <div className="row-span-4"><img className="rounded-md border object-cover" width="500px" height="500px" src={npc.imageUrl} /></div>}
            <div className="flex flex-col">
              <CardTitle>
                <div className="flex-1 space-y-4 pt-6">
                  <div className="flex items-center justify-between space-y-2">
                    <div>
                      <div className="flex mr-3 items-center">
                        <Avatar className="mr-3">
                          <AvatarImage src={npc?.imageUrl ?? ""} />
                          <AvatarFallback><HiOutlineUserGroup /></AvatarFallback>
                        </Avatar>
                        {npc.name}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button className="mr-3" onClick={() => router.push(`/${npc.campaignId}/npcs`)}>
                        Back
                      </Button>
                      <Button onClick={() => router.push(`/${npc.campaignId}/npcs/edit/${npc.id}`)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardTitle>
              {npc.faction && <div className="mt-4 mb-4"><CardDescription>{npc.faction}</CardDescription></div>}
              {(npc.race || npc.class || npc.allegiance) && (
                <CardDescription>
                  {npc.race && <RingContent>{npc.race}</RingContent>}
                  {npc.class && <RingContent variant="neutral" className='ml-3'>{npc.class}</RingContent>}
                  {npc.allegiance && <RingContent className='ml-3'>{npc.allegiance}</RingContent>}
                </CardDescription>
              )
              }
              <div className="mt-4"><RichViewer key={npc.id} content={npc.description ?? ""} /></div>
            </div>
          </div>

        </CardContent >
      </Card >
    </>
  )
};

export default NpcView;