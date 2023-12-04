import { useEffect } from "react";
import "../assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "../components/OneRepMax";
import WorkoutProgram from "../components/WorkoutProgram";
import { useUser, useUserUpdate } from "../contexts/UserContext";
import { fetchData } from "../utils/api";
import { UserMaxesProvider } from "../contexts/UserMaxesContext";
import UserProfileForm from "../components/UserProfileForm";

interface DashboardPageProps {
  setAuth: (value: boolean) => void;
}

interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  gender: string;
  bodyweight: number;
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

      const {
        firstName,
        lastName,
        email,
        gender,
        bodyweight,
        id,
        workoutProgramId,
      } = data;

      setUserInformation({
        id,
        firstName,
        lastName,
        email,
        gender,
        bodyweight,
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
    <UserMaxesProvider>
      <div id="dashboard-container">
        <h1>{`${firstName} ${lastName}`}</h1>
        <UserProfileForm user={userInformation} />
        <OneRepMax />
        <WorkoutProgram />
      </div>
    </UserMaxesProvider>
  );
};

export default DashboardPage;
