import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { BsIncognito } from "react-icons/bs";

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

  const impersonateUser = (userId: number) => {
    navigate(`/admin/impersonate_user/${userId}`);
  };

  return (
    <>
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>{workoutProgramName}</td>
        <td className="user-buttons">
          <FaEdit onClick={() => navigateUser(id)} />
          <BsIncognito onClick={() => impersonateUser(id)} />
        </td>
      </tr>
    </>
  );
};

export default UserItem;
