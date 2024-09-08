import Link from "next/link";
import { ALLEGIANCES, Npc } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { HiUserGroup } from "react-icons/hi2";
import RingContent from "~/app/_components/ui/ring-content";

const NpcCard = async ({ npc }: { npc: Npc }) => {

  return (
    <>
      <div className="p-4 max-w-sm">
        <Link href={`/npcs/edit/${npc.id}`}>

          <Card className="max-h-96 h-96  w-80">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center mb-3">
                  <div className=" mr-3">
                    <HiUserGroup />
                  </div>
                  {npc.name}
                </div>
              </CardTitle>
              {(npc.race || npc.class || npc.faction) && (
                <CardDescription>
                  <div className="mb-1">{npc.faction}</div>
                  {npc.race && <RingContent>{npc.race}</RingContent>}
                  {npc.class && <RingContent variant="neutral" className='ml-3'>{npc.class}</RingContent>}
                  {npc.allegiance && <RingContent className='ml-3'>{npc.allegiance}</RingContent>}
                </CardDescription>
              )
              }
            </CardHeader>
            <CardContent>
              <p className="max-w-full overflow-hidden line-clamp-8">{npc.description}</p>
            </CardContent>
          </Card>
        </Link>
      </div >
    </>
  );
};

export default NpcCard;