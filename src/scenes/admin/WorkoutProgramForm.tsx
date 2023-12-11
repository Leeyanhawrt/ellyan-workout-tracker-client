import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";

type WorkoutProgramFormProps = {
  workoutProgramId?: number;
};

const WorkoutProgramForm: React.FC<WorkoutProgramFormProps> = ({
  workoutProgramId,
}) => {
  const [inputs, setInputs] = useState({
    workoutProgram: workoutProgramId || "",
  });

  const { workoutProgram } = inputs;

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

  const handleSelectChange = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <>
      <div className="row">
        <div className="flex-item">
          <label htmlFor="workout-program">WORKOUT PROGRAM</label>
          <select
            value={workoutProgram || ""}
            onChange={(e) =>
              handleSelectChange("workoutProgram", e.target.value)
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
