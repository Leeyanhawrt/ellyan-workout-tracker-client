import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";
import { useParams } from "react-router";

interface WorkoutProgramFormProps {}

const WorkoutProgramForm: React.FC<WorkoutProgramFormProps> = ({}) => {
  const { workoutProgramId } = useParams();

  const {
    data: workoutPrograms,
    loading,
    fetchData,
  } = useAxios<WorkoutProgram[]>(
    [],
    `/admin/workout_programs/microcycle/${workoutProgramId}`,
    `Microcylces`,
    true
  );

  console.log(workoutPrograms);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <></>;
};

export default WorkoutProgramForm;
