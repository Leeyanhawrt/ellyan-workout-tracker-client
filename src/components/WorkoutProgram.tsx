import "../assets/stylesheets/components/_WorkoutProgram.scss";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

interface WorkoutProgramProps {}

interface Microcycle {
  id: number;
  microcycleNumber: number;
}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  const [microcycles, setMicrocycles] = useState<Microcycle[]>([]);

  const userInformation = useUser();

  useEffect(() => {
    if (userInformation) {
      fetchMicrocycles();
    }
  }, [userInformation]);

  if (!userInformation) {
    return <div>Loading...</div>;
  }

  const { id } = userInformation;

  const fetchMicrocycles = async () => {
    let response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/workout-program/${id}`,
      {
        headers: { token: localStorage.token },
      }
    );
    return response;
  };

  return (
    <div className="content-container">
      <Carousel />
    </div>
  );
};

export default WorkoutProgram;
