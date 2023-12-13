import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import Microcycle from "./Microcycle";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";

interface WorkoutProgramProps {
  edittable?: boolean;
}

export type WorkoutProgram = {
  id: number;
  name: string;
};

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({ edittable }) => {
  const { programId } = useParams();

  const user = useUser();

  const workoutProgramId = edittable ? programId : user?.workoutProgramId;

  const {
    data: microcycles,
    loading,
    fetchData,
  } = useAxios<Microcycle[]>(
    [],
    `/workout_program/microcycle/${workoutProgramId}`,
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
