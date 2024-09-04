import { useEffect, useState, ChangeEvent } from "react";
import useAxios from "../../hooks/useAxios";
import WorkoutProgramItem from "./WorkoutProgramItem";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";
import "/src/assets/stylesheets/components/_Table.scss";
import { RiPlayListAddFill } from "react-icons/ri";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface WorkoutProgramListProps {}

type WorkoutProgramDetail = {
  programName: string | undefined;
};

const WorkoutProgramList: React.FC<WorkoutProgramListProps> = ({}) => {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [showAddProgram, setShowAddProgram] = useState<boolean>(false);
  const [inputs, setInputs] = useState<WorkoutProgramDetail>({
    programName: undefined,
  });

  const { programName } = inputs;

  const { data, loading, fetchData } = useAxios<WorkoutProgram[]>(
    [],
    `/admin/workout_programs`,
    `Users List`,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setWorkoutPrograms(data);
  }, [data]);

  const toggleAddProgram = () => {
    setShowAddProgram((prevShow) => !prevShow);
  };

  const removeWorkoutProgram = (workoutProgramId: number) => {
    const updatedPrograms = workoutPrograms.filter((program) => {
      return program.id !== workoutProgramId;
    });
    setWorkoutPrograms(updatedPrograms);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const appendProgram = (newProgram: WorkoutProgram) => {
    setWorkoutPrograms([...workoutPrograms, newProgram]);
  };

  const submitProgramForm = async () => {
    if (inputs.programName?.length === 0) {
      toast.error("Please Provide Program Name");
      return;
    }

    const response = await postData(
      `/admin/workout_programs`,
      { ...inputs },
      true
    );

    if (response?.status === 201) {
      appendProgram(response?.data?.workoutProgram);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    submitProgramForm();
    setShowAddProgram(false);
  };

  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    submitProgramForm();
    setShowAddProgram(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Program Name</th>
          {!showAddProgram ? (
            <th className="add-program-container">
              <RiPlayListAddFill
                onClick={toggleAddProgram}
                className="add-program"
              />
            </th>
          ) : (
            <th className="add-program-container">
              <form id="add-program-form" onSubmit={handleSubmit}>
                <input
                  onChange={handleChange}
                  type="text"
                  name="programName"
                  id="programName"
                  placeholder="Program Name"
                  value={programName || ""}
                />
                <IoIosCheckmarkCircleOutline
                  className="add-program"
                  onClick={handleClick}
                />
              </form>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {workoutPrograms.map((workoutProgram) => {
          return (
            <WorkoutProgramItem
              key={workoutProgram.id}
              {...workoutProgram}
              removeProgram={removeWorkoutProgram}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default WorkoutProgramList;
