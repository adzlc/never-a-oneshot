import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/**
 * Component for viewing a Boolean.
 * 
 * @param value The boolean value.
 * @returns 
 */
const BooleanView = ({
  value,
}: {
  value: boolean;
}) => {

  return (
    <>
      {value ? <FaCheckCircle /> : <FaTimesCircle />}
    </>
  )
};

export default BooleanView;