import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import Microcycle from "./Microcycle";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";

interface WorkoutProgramProps {}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  const user = useUser();

  let workoutProgramId;

  if (user) {
    workoutProgramId = user.workoutProgramId;
  }

  const {
    data: microcycles,
    loading,
    fetchData,
  } = useAxios<Microcycle[]>(
    [],
    `/workout-program/microcycle/${workoutProgramId}`,
    `Microcycles`,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="workout-program-container">
      <Microcycle microcycles={microcycles} />
    </div>
  );
};

export default WorkoutProgram;
