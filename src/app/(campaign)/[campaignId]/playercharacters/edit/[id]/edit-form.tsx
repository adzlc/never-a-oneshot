import Form from "@/appcomponents/playercharacter/playerchracter-form";
import { type PlayerCharacter, type PlayerCharacterFormValues } from "~/data/typings";

const EditPlayerChracter = ({
  data,
  editFunction,
}: {
  data: PlayerCharacter;
  editFunction: (data: PlayerCharacterFormValues) => Promise<string>;
}) => {
  const pc = data;

  return (
    <>
      {pc && (
        <>
          <Form
            data={pc}
            campaignId={pc.campaignId}
            submitAction={editFunction}
          />
        </>
      )}
    </>
  );
};

export default EditPlayerChracter;