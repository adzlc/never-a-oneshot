import Link from "next/link";
import { type PlayerCharacter } from "~/data/typings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { HiUserGroup } from "react-icons/hi2";
import RingContent from "~/app/_components/ui/ring-content";

const PlayerCharacterCard = async ({ npc: playerCharacter }: { npc: PlayerCharacter }) => {

  return (
    <>
      <div className="p-4 max-w-sm">
        <Link href={`/playercharacters/edit/${playerCharacter.id}`}>

          <Card className="max-h-96 h-96  w-80">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center mb-3 text-primary">
                  <div className=" mr-3">
                    <HiUserGroup />
                  </div>
                  {playerCharacter.name}
                </div>
              </CardTitle>
              {(playerCharacter.race || playerCharacter.class) && (
                <CardDescription>
                  {playerCharacter.race && <RingContent>{playerCharacter.race}</RingContent>}
                  {playerCharacter.class && <RingContent variant="neutral" className='ml-3'>{playerCharacter.class}</RingContent>}
                </CardDescription>
              )
              }
            </CardHeader>
            <CardContent>
              <p className="max-w-full overflow-hidden line-clamp-8">{playerCharacter.backstory}</p>
            </CardContent>
          </Card>
        </Link>
      </div >
    </>
  );
};

export default PlayerCharacterCard;