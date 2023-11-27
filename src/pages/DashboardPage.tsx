import { useEffect } from "react";
import "../assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "../components/OneRepMax";
import WorkoutProgram from "../components/WorkoutProgram";
import { useUser, useUserUpdate } from "../contexts/UserContext";
import { fetchData } from "../utils/api";

interface DashboardPageProps {
  setAuth: (value: boolean) => void;
}

interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  workoutProgramId: number;
}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const userInformation = useUser();
  const setUserInformation = useUserUpdate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetchData(`/dashboard`, "User Information", true);
      const data: UserInformation = response.data;

      const { firstName, lastName, email, id, workoutProgramId } = data;

      setUserInformation({
        id,
        firstName,
        lastName,
        email,
        workoutProgramId,
      });
    } catch (err) {
      console.error(`Error Fetching User Information: ${err}`);
    }
  };

  if (!userInformation) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName } = userInformation;

  return (
    <div id="dashboard-container">
      <h1>{`${firstName} ${lastName}`}</h1>
      <OneRepMax />
      <WorkoutProgram />
    </div>
  );
};

export default DashboardPage;
