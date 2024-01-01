import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import { useState } from "react";
import Microcycle from "./Microcycle";
import { Microcycle as MicrocycleT } from "./Microcycle";
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
  const [microcycles, setMicrocycles] = useState<MicrocycleT[]>([]);

  let { id } = useParams();

  const user = useUser();

  if (impersonate) {
    useFetchMaxes(id);
  }

  let workoutProgramId = edittable || impersonate ? id : user?.workoutProgramId;

  const { data, loading, fetchData } = useAxios<MicrocycleT[]>(
    [],
    `/workout_program/microcycle/${workoutProgramId}`,
    `Microcycles`,
    true
  );

  const appendMicrocycle = (newMicrocycle: MicrocycleT) => {
    setMicrocycles((prev) => [...prev, newMicrocycle]);
  };

  const updateMicrocycle = (id: number, newPhase: string) => {
    const updatedMicrocycles = microcycles.map((microcycle) => {
      if (microcycle.id === id) {
        return { ...microcycle, phase: newPhase };
      }
      return microcycle;
    });
    setMicrocycles(updatedMicrocycles);
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
        updateMicrocycle={updateMicrocycle}
      />
    </div>
  );
};

export default WorkoutProgram;
