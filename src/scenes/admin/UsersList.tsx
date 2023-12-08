import { useEffect } from "react";
import { User } from "../../contexts/UserContext";
import UserItem from "./UserItem";
import useAxios from "../../hooks/useAxios";

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = ({}) => {
  const {
    data: users,
    loading,
    fetchData,
  } = useAxios<User[]>([], `/admin/user`, `Users List`, true);

  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {users.map((user) => {
        return <UserItem key={user.id} {...user} />;
      })}
    </>
  );
};

export default UsersList;
