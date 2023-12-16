import { useEffect } from "react";
import { User } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import UserItem from "./UserItem";
import "/src/assets/stylesheets/components/_Table.scss";

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = ({}) => {
  const {
    data: users,
    loading,
    fetchData,
  } = useAxios<User[]>([], `/admin/users`, `Users List`, true);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table table-oversized">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Workout Program</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return <UserItem key={user.id} {...user} />;
        })}
      </tbody>
    </table>
  );
};

export default UsersList;
