import { useEffect } from "react";
import "/src/assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "./OneRepMax";
import WorkoutProgram from "./WorkoutProgram";
import { useUser, useUserUpdate } from "../../contexts/UserContext";
import { fetchData } from "../../utils/api";
import UserProfileForm from "./UserProfileForm";
import { User } from "../../contexts/UserContext";
import { Route, Routes } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import useFetchMaxes from "../../hooks/useFetchMaxes";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  // Updates Users Maxes in Context;
  useFetchMaxes();

  const userInformation = useUser();
  const setUserInformation = useUserUpdate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetchData(`/dashboard`, "User Information", true);
      const data: User = response.data;

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

  return (
    <div id="dashboard">
      <DashboardNav />
      <Routes>
        <Route
          path="/preferences"
          element={<UserProfileForm user={userInformation} />}
        />
        <Route
          path="/edit_record"
          element={<OneRepMax user={userInformation} />}
        />
        <Route path="/workout_program" element={<WorkoutProgram />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
