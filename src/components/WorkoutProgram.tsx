import "../assets/stylesheets/components/_WorkoutProgram.scss";
import Microcycle from "./Microcycle";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { fetchData } from "../utils/api";

interface WorkoutProgramProps {}

interface Microcycles {
  id: number;
  microcycleNumber: number;
}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  const [microcycles, setMicrocycles] = useState<Microcycles[]>([]);

  const userInformation = useUser();

  useEffect(() => {
    if (userInformation) {
      const setData = async () => {
        const { workoutProgramId } = userInformation;

        try {
          const response = await fetchData(
            `/workout-program/microcycle/${workoutProgramId}`,
            "Microcycles",
            true
          );
          const data: Microcycles[] = response.data;
          setMicrocycles(data);
        } catch (err) {
          console.error("Error Fetching Microcycles:", err);
        }
      };
      setData();
    }
  }, [userInformation]);

  if (!userInformation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-program-container">
      <Microcycle microcycles={microcycles} />
    </div>
  );
};

export default WorkoutProgram;
