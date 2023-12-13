import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import WorkoutProgramItem from "./WorkoutProgramItem";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";
import "/src/assets/stylesheets/components/_Table.scss";

interface WorkoutProgramListProps {}

const WorkoutProgramList: React.FC<WorkoutProgramListProps> = ({}) => {
  const {
    data: workoutPrograms,
    loading,
    fetchData,
  } = useAxios<WorkoutProgram[]>(
    [],
    `/admin/workout_programs`,
    `Users List`,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(workoutPrograms);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Program Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {workoutPrograms.map((workoutProgram) => {
          return (
            <WorkoutProgramItem key={workoutProgram.id} {...workoutProgram} />
          );
        })}
      </tbody>
    </table>
  );
};

export default WorkoutProgramList;
