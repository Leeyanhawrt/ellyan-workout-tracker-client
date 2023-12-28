import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import { useState } from "react";
import Microcycle from "./Microcycle";
import useFetchMaxes from "../../hooks/useFetchMaxes";

interface WorkoutProgramProps {
  edittable?: boolean;
  impersonate?: boolean;
}

export type WorkoutProgram = {
  id: number;
  name: string;
};

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({
  edittable,
  impersonate,
}) => {
  const [microcycles, setMicrocycles] = useState<Microcycle[]>([]);

  let { id } = useParams();

  const user = useUser();

  const cottage = "exciting";

  if (impersonate) {
    useFetchMaxes(id);
  }

  let workoutProgramId = edittable || impersonate ? id : user?.workoutProgramId;

  const { data, loading, fetchData } = useAxios<Microcycle[]>(
    [],
    `/workout_program/microcycle/${workoutProgramId}`,
    `Microcycles`,
    true
  );

  const appendMicrocycle = (newMicrocycle: Microcycle) => {
    setMicrocycles((prev) => [...prev, newMicrocycle]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setMicrocycles(data);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="workout-program-container">
      <Microcycle
        edittable={edittable}
        workoutProgramId={workoutProgramId}
        microcycles={microcycles}
        handleAdd={appendMicrocycle}
      />
    </div>
  );
};

export default WorkoutProgram;
