import Button from "./Button";
import { useState, useEffect } from "react";

interface DashboardProps {
  setAuth: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const [name, setName] = useState<string>("");

  const getName = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={() => setAuth(false)}>Logout</Button>
    </>
  );
};

export default Dashboard;
