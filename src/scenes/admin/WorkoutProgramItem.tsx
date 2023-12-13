import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

type WorkoutProgramItemProps = {
  id: number;
  name: string;
};

const WorkoutProgramItem: React.FC<WorkoutProgramItemProps> = ({
  id,
  name,
}) => {
  const navigate = useNavigate();

  const navigateUser = (userId: number) => {
    navigate(`/admin/manage_users/${userId}`);
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          <FaEdit onClick={() => navigateUser(id)} />
        </td>
      </tr>
    </>
  );
};

export default WorkoutProgramItem;
