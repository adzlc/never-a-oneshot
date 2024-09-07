"use client";
import { useRouter } from "next/navigation";
import Form from "@/appcomponents/npc/npc-form";
import { type Npc, type NpcFormValues } from "~/data/typings";

const EditForm = ({
  data,
  editFunction,
  deleteAction,
}: {
  data: Npc;
  editFunction: (data: NpcFormValues) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}) => {
  const pc = data;
  const router = useRouter();

  async function submitAction(data: NpcFormValues) {
    await editFunction(data);
    router.push(`/npcs/${pc.campaignId}`);
  }

  return (
    <>
      {pc && (
        <>
          <Form
            data={pc}
            campaignId={pc.campaignId}
            submitAction={submitAction}
            deleteAction={deleteAction}
          />
        </>
      )}
    </>
  );
};

export default EditForm;