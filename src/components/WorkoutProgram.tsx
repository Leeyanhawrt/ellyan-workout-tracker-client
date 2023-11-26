import "../assets/stylesheets/components/_WorkoutProgram.scss";
import Carousel from "./Carousel";
import { useEffect } from "react";
import axios from "axios";

interface WorkoutProgramProps {}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  useEffect(() => {
    fetchMicrocycles();
  }, []);

  const fetchMicrocycles = async () => {
    let response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/workout-program/`,
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
