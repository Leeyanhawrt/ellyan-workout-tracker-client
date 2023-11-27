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
      const fetchData = async () => {
        try {
          const response = await fetchMicrocycles();
          const data: Microcycle[] = response.data;
          setMicrocycles(data);
        } catch (err) {
          console.error("Error fetching microcycles:", err);
        }
      };
      fetchData();
    }
  }, [userInformation]);

  if (!userInformation) {
    return <div>Loading...</div>;
  }

  const fetchMicrocycles = async () => {
    const { workoutProgramId } = userInformation;

    let response = await axios.get(
      `${
        import.meta.env.VITE_APP_BACKEND
      }/workout-program/microcycle/${workoutProgramId}`,
      {
        headers: { token: localStorage.token },
      }
    );
    return response;
  };

  return (
    <div className="content-container">
      <Carousel microcycle items={microcycles} />
    </div>
  );
};

export default WorkoutProgram;
