import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteData } from "../../utils/api";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";

type WorkoutProgramItemProps = {
  id: number;
  name: string;
  removeProgram: (workoutProgramId: number) => void;
};

const WorkoutProgramItem: React.FC<WorkoutProgramItemProps> = ({
  id,
  name,
  removeProgram,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateUser = (workoutProgramId: number) => {
    navigate(`/admin/workout_programs/${workoutProgramId}`);
  };

  const toggleConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const handleDelete = async (workoutProgramId: number) => {
    const response = await deleteData(
      `/admin/workout_programs/${workoutProgramId}`,
      true
    );

    if (response?.status === 200) {
      removeProgram(workoutProgramId);
    }
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        {!showConfirmation ? (
          <td className="flex-table-content">
            <FaEdit onClick={() => navigateUser(id)} />
            <FaRegTrashCan onClick={toggleConfirmation} />
          </td>
        ) : (
          <td className="flex-table-content">
            <FcCheckmark onClick={() => handleDelete(id)} />
            <FcCancel onClick={toggleConfirmation} />
          </td>
        )}
      </tr>
    </>
  );
};

export default WorkoutProgramItem;
