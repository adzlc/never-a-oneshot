"use client";
import { useRouter } from "next/navigation";
import Form from "@/appcomponents/playercharacter/playerchracter-form";
import { type PlayerCharacter, type PlayerCharacterFormValues } from "~/data/typings";

const EditPlayerChracter = ({
  data,
  editFunction,
}: {
  data: PlayerCharacter;
  editFunction: (data: PlayerCharacterFormValues) => Promise<void>;
}) => {
  const pc = data;
  const router = useRouter();

  async function submitAction(data: PlayerCharacterFormValues) {
    await editFunction(data);
    router.push(`/playercharacters/${pc.campaignId}`);
  }

  return (
    <>
      {pc && (
        <>
          <Form
            data={pc}
            campaignId={pc.campaignId}
            submitAction={submitAction}
          />
        </>
      )}
    </>
  );
};

export default EditPlayerChracter;