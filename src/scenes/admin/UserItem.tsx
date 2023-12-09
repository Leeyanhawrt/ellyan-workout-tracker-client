import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

type UserItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  bodyweight?: number | string;
  workoutProgramName?: string;
  workoutProgramId: number;
};

const UserItem: React.FC<UserItemProps> = ({
  id,
  firstName,
  lastName,
  email,
  gender,
  workoutProgramName,
}) => {
  const navigate = useNavigate();

  const navigateUser = (userId: number) => {
    navigate(`/admin/manage_users/${userId}`);
  };

  return (
    <>
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>{workoutProgramName}</td>
        <td>
          <FaEdit onClick={() => navigateUser(id)} />
        </td>
      </tr>
    </>
  );
};

export default UserItem;
