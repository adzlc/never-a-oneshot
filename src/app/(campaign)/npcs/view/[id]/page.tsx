
import { Card, CardContent, CardDescription, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { HiUserGroup } from "react-icons/hi2";
import RingContent from "~/app/_components/ui/ring-content";
import { get } from "~/server/actions/npcs";
interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = async ({ params }: PageProps) => {
  const id = params.id;
  const npc = await get(id);

  if (!npc) {
    return;
  }
  return (
    <>
      {npc && (
        <>
          <Card>
            <CardContent>
              <div className="grid grid-rows-4 grid-flow-col gap-4 mt-4">
                {npc.imageUrl && <div className="row-span-4"><img className="rounded-md border object-cover" width="500px" height="500px" src={npc.imageUrl} /></div>}
                <div className="flex flex-col">
                  <CardTitle>
                    <div className="flex items-center text-priamry">
                      <div className=" mr-3">
                        <Avatar>
                          <AvatarImage src={npc?.imageUrl ?? ""} />
                          <AvatarFallback><HiUserGroup /></AvatarFallback>
                        </Avatar>
                      </div>
                      {npc.name}
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
                  <div className="mt-4">{npc.description}</div>
                </div>
              </div>

            </CardContent>
          </Card>
        </>
      )
      }
    </>
  );
};

export default EditPage;