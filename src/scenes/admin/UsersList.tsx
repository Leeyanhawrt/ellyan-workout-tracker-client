import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import { User } from "../../contexts/UserContext";
import UserItem from "./UserItem";

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);

  if (!users) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(`/admin/user/`, "Users List", true);

        const data: User[] = response.data;

        setUsers(data);
      } catch (err) {
        console.error("Error Fetching Daily Workouts:", err);
      }
    };
    setData();
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
