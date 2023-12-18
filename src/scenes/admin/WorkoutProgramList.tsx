import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import WorkoutProgramItem from "./WorkoutProgramItem";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";
import "/src/assets/stylesheets/components/_Table.scss";
import { RiPlayListAddFill } from "react-icons/ri";

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

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Program Name</th>
          <th>
            <RiPlayListAddFill className="add-program" />
          </th>
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
