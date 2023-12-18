import { useEffect, useState, ChangeEvent } from "react";
import useAxios from "../../hooks/useAxios";
import WorkoutProgramItem from "./WorkoutProgramItem";
import { WorkoutProgram } from "../dashboard/WorkoutProgram";
import "/src/assets/stylesheets/components/_Table.scss";
import { RiPlayListAddFill } from "react-icons/ri";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";

interface WorkoutProgramListProps {}

type WorkoutProgramDetail = {
  programName: string | undefined;
};

const WorkoutProgramList: React.FC<WorkoutProgramListProps> = ({}) => {
  const [showAddProgram, setShowAddProgram] = useState<boolean>(false);
  const [inputs, setInputs] = useState<WorkoutProgramDetail>({
    programName: undefined,
  });
  const [programList, setProgramList] = useState<WorkoutProgram[]>([]);

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
    setProgramList(data);
  }, [data]);

  const toggleAddProgram = () => {
    setShowAddProgram((prevShow) => !prevShow);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const appendProgram = (newProgram: WorkoutProgram) => {
    setProgramList([...programList, newProgram]);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await postData(
      `/admin/workout_programs/`,
      { ...inputs },
      true
    );

    if (response?.status === 201) {
      appendProgram(response?.data?.dailyWorkout);
    }

    setShowAddProgram(false);
    toast.success("Successfully Added New Program");
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
            <th onClick={toggleAddProgram} className="add-program-container">
              <RiPlayListAddFill className="add-program" />
            </th>
          ) : (
            <th>
              <input
                onChange={handleChange}
                type="text"
                name="programName"
                id="programName"
                placeholder="Program Name"
                value={programName}
              />
            </th>
          )}
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
