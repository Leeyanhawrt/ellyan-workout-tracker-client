import { useEffect } from "react";
import "/src/assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "./OneRepMax";
import WorkoutProgram from "./WorkoutProgram";
import { fetchData } from "../../utils/api";
import UserProfileForm from "./UserProfileForm";
import { Route, Routes } from "react-router-dom";
import { useUserUpdate, User, useUser } from "../../contexts/UserContext";
import DashboardNav from "./DashboardNav";
import useFetchMaxes from "../../hooks/useFetchMaxes";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const user = useUser();
  const setUser = useUserUpdate();

  useFetchMaxes();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetchData(`/dashboard`, "User Information", true);
      const data: User = response?.data;

      const {
        firstName,
        lastName,
        email,
        gender,
        bodyweight,
        id,
        workoutProgramId,
        roles,
      } = data;

      setUser({
        id,
        firstName,
        lastName,
        email,
        gender,
        bodyweight,
        workoutProgramId,
        roles,
      } as User);
    } catch (err) {
      console.error(`Error Fetching User Information: ${err}`);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div id="dashboard">
      <DashboardNav />
      <Routes>
        <Route path="/preferences" element={<UserProfileForm />} />
        <Route path="/edit_record" element={<OneRepMax />} />
        <Route path="/workout_program" element={<WorkoutProgram />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
