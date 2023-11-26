import { useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "../components/OneRepMax";
import WorkoutProgram from "../components/WorkoutProgram";
import { useUser, useUserUpdate } from "../contexts/UserContext";

interface DashboardPageProps {
  setAuth: (value: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const userInformation = useUser();
  const setUserInformation = useUserUpdate();

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/dashboard`,
        {
          headers: { token: localStorage.token },
        }
      );

      const { firstName, lastName, email, userId } = response.data;

      setUserInformation({
        userId,
        firstName,
        lastName,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
