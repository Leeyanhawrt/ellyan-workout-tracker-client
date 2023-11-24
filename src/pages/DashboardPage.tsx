import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "../components/OneRepMax";
import WorkoutProgram from "../components/WorkoutProgram";

interface DashboardPageProps {
  setAuth: (value: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const [name, setName] = useState<string>("");

  const getName = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/dashboard`,
        {
          headers: { token: localStorage.token },
        }
      );

      const { firstName, lastName } = response.data;

      setName(`${firstName} ${lastName}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div id="dashboard-container">
      <h1>{name}</h1>
      <OneRepMax />
      <WorkoutProgram />
    </div>
  );
};

export default DashboardPage;
