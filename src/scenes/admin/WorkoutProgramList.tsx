import { useEffect } from "react";
import { User } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import UserItem from "./UserItem";
import "/src/assets/stylesheets/components/admin/_Users.scss";

interface WorkoutProgramListProps {}

const WorkoutProgramList: React.FC<WorkoutProgramListProps> = ({}) => {
  const {
    data: workoutPrograms,
    loading,
    fetchData,
  } = useAxios<User[]>([], `/admin/workout_programs`, `Users List`, true);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table id="workout-program-table">
      <thead>
        <tr>
          <th>Program Name</th>
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

export default WorkoutProgramList;
