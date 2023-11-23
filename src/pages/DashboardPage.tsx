import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/pages/_p_dashboard.scss";
import OneRepMax from "../components/OneRepMax";

interface DashboardPageProps {
  setAuth: (value: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const [name, setName] = useState<string>("");

  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  const getName = async () => {
    try {
      const response = await axios.get(`${backendUrl}/dashboard`, {
        headers: { token: localStorage.token },
      });

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
    </div>
  );
};

export default DashboardPage;
