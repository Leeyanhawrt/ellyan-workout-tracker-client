import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import Microcycle from "./Microcycle";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import { useUser } from "../../contexts/UserContext";

interface WorkoutProgramProps {}

interface Microcycles {
  id: number;
  microcycleNumber: number;
}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  const [microcycles, setMicrocycles] = useState<Microcycles[]>([]);

  const user = useUser();

  useEffect(() => {
    if (user) {
      const setData = async () => {
        const { workoutProgramId } = user;

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
  }, []);

  return (
    <div id="workout-program-container">
      <Microcycle microcycles={microcycles} />
    </div>
  );
};

export default WorkoutProgram;
