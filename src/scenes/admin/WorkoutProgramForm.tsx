import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";

type WorkoutProgramFormProps = {
  workoutProgramId?: number | undefined;
  handleSelectChange: (name: string, value: string) => void;
};

const WorkoutProgramForm: React.FC<WorkoutProgramFormProps> = ({
  workoutProgramId,
  handleSelectChange,
}) => {
  const {
    data: workoutProgramList,
    loading,
    fetchData,
  } = useAxios<WorkoutProgram[]>(
    [],
    `/admin/workout_programs`,
    "Workout Program",
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="flex-item">
          <label htmlFor="workout-program">WORKOUT PROGRAM</label>
          <select
            value={workoutProgramId || ""}
            onChange={(e) =>
              handleSelectChange("workoutProgramId", e.target.value)
            }
          >
            <option hidden value="">
              Select Workout Program
            </option>
            {workoutProgramList.map((workoutProgram) => {
              return (
                <option key={workoutProgram.id} value={workoutProgram.id}>
                  {workoutProgram.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex-item"></div>
      </div>
    </>
  );
};
export default WorkoutProgramForm;
