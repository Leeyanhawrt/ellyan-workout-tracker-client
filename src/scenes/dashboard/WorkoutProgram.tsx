import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import Microcycle from "./Microcycle";
import { Microcycle as MicrocycleT } from "./Microcycle";
import useFetchMaxes from "../../hooks/useFetchMaxes";
import { useMicrocycles } from "../../contexts/MicrocyclesContext";
import { useImpersonateUser } from "../../contexts/ImpersonateUserContext";
import useFetchImpersonateUser from "../../hooks/useFetchImpersonateUser";

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
  const { microcycles, setMicrocycles, appendMicrocycle } = useMicrocycles();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { id } = useParams();

  const user = useUser();
  const impersonateUser = useImpersonateUser();

  if (impersonate) {
    useFetchMaxes(id);
    useFetchImpersonateUser(id);
  }

  let workoutProgramId;
  if (edittable) {
    workoutProgramId = id;
  } else if (impersonate) {
    workoutProgramId = impersonateUser?.workoutProgramId || 1;
  } else {
    workoutProgramId = user?.workoutProgramId;
  }

  const { data, loading, fetchData } = useAxios<MicrocycleT[]>(
    [],
    `/workout_program/microcycle/${workoutProgramId}`,
    `Microcycles`,
    true
  );

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
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    setMicrocycles(data);
  }, [data]);

  if (loading || isLoading) {
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
