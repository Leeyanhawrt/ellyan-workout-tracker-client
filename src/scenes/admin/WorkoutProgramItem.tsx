import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteData } from "../../utils/api";

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
  const navigate = useNavigate();

  const navigateUser = (workoutProgramId: number) => {
    navigate(`/admin/workout_programs/${workoutProgramId}`);
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
        <td className="flex-table-content">
          <FaEdit onClick={() => navigateUser(id)} />
          <FaRegTrashCan onClick={() => handleDelete(id)} />
        </td>
      </tr>
    </>
  );
};

export default WorkoutProgramItem;
