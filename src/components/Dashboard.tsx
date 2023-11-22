import Button from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";

interface DashboardProps {
  setAuth: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1>Dashboard {name}</h1>
      <Button size={"large"} onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
