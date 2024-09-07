import { DataTable } from "./data-table";
import { columns } from "./columns";
import { revalidatePath } from "next/cache";
import { deletePlayerCharacter, list } from "~/server/actions/playercharacters";

const PlayerCharacterList = async ({ campaignId }: { campaignId: string }) => {
  const data = await list(campaignId);

  async function deleteAction(id: string) {
    "use server";
    await deletePlayerCharacter(id);
    revalidatePath("/");
  }
  return (
    <>
      {data && (
        <div>
          <div className="mb-6">
            <DataTable
              columns={columns}
              data={data}
              deleteAction={deleteAction}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default PlayerCharacterList;