import Button from "./Button";

interface DashboardProps {
  setAuth: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={() => setAuth(false)}>Logout</Button>
    </>
  );
};

export default Dashboard;
