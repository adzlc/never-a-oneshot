"use client";
import Link from "next/link";
import { type Npc } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { HiUserGroup } from "react-icons/hi2";
import RingContent from "~/app/_components/ui/ring-content";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import RichViewer from "~/components/ui/rich-text/rich-viewer";

const NpcCard = async ({ npc }: { npc: Npc }) => {

  return (
    <>
      <div className="p-4 max-w-sm">
        <Link href={`/${npc.campaignId}/npcs/view/${npc.id}`}>

          <Card className="max-h-96 h-96  w-80">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center mb-3 text-priamry">
                  <div className=" mr-3">
                    <Avatar>
                      <AvatarImage src={npc?.imageUrl ?? ""} />
                      <AvatarFallback><HiUserGroup /></AvatarFallback>
                    </Avatar>
                  </div>
                  {npc.name}
                </div>
              </CardTitle>
              {npc.faction && <CardDescription>{npc.faction}</CardDescription>}
              {(npc.race || npc.class || npc.allegiance) && (
                <CardDescription>
                  {npc.race && <RingContent>{npc.race}</RingContent>}
                  {npc.class && <RingContent variant="neutral" className='ml-3'>{npc.class}</RingContent>}
                  {npc.allegiance && <RingContent className='ml-3'>{npc.allegiance}</RingContent>}
                </CardDescription>
              )
              }
            </CardHeader>
            <CardContent>
              <p className="max-w-full overflow-hidden line-clamp-8"><RichViewer key={npc.id} content={npc.description ?? ""} /></p>
            </CardContent>
          </Card>
        </Link>
      </div >
    </>
  );
};

export default NpcCard;