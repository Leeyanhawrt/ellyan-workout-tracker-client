import "../assets/stylesheets/components/_WorkoutProgram.scss";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { fetchData } from "../utils/api";

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
      const setData = async () => {
        const { workoutProgramId } = userInformation;

        try {
          const response = await fetchData(
            `/workout-program/microcycle/${workoutProgramId}`,
            "Microcycles",
            true
          );
          const data: Microcycle[] = response.data;
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
    <div className="content-container">
      <Carousel microcycle items={microcycles} />
    </div>
  );
};

export default WorkoutProgram;
