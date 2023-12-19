import "/src/assets/stylesheets/components/_Exercise.scss";
import { MdCancel } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { postData } from "../../utils/api";
import { MdCheckCircle } from "react-icons/md";
import { Exercise } from "../dashboard/ExerciseList";

type ExerciseForm = {
  exerciseName: string;
  sets: number | string;
  reps: number | string;
  rpe: number | string;
  percentage: number | string;
  [key: string]: number | string;
  dailyWorkoutId: number;
};

interface ExerciseFormProps {
  handleClose: () => void;
  dailyWorkoutId: number;
  handleAdd: (newExercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  handleClose,
  dailyWorkoutId,
  handleAdd,
}) => {
  const [inputs, setInputs] = useState<ExerciseForm>({
    exerciseName: "",
    sets: "",
    reps: "",
    rpe: "",
    percentage: "",
    dailyWorkoutId: dailyWorkoutId,
  });

  const { exerciseName, sets, reps, rpe, percentage } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "exerciseName") {
      setInputs({ ...inputs, [name]: value.trimEnd() });
      return;
    }

    setInputs({
      ...inputs,
      [e.target.name]: parseInt(e.target.value, 10) || "",
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await postData(
      `/admin/workout_programs/exercise`,
      { ...inputs },
      true
    );

    if (response?.status === 201) {
      handleAdd(response?.data?.dailyWorkout);
    }

    handleClose();
  };

  return (
    <div className="exercise-item-container exercise-item-form">
      <div className="icon-container">
        <MdCheckCircle className="form-icon" onClick={handleSubmit} />
        <MdCancel onClick={handleClose} className="form-icon" />
      </div>
      <form>
        <div className="exercise-name">
          <input
            type="text"
            name="exerciseName"
            id="exerciseName"
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={handleChange}
          />
        </div>
        <div className="exercise-scheme">
          <input
            type="number"
            name="sets"
            id="sets"
            placeholder="# Sets"
            value={sets}
            onChange={handleChange}
            min="0"
          />
          <input
            type="number"
            name="reps"
            id="reps"
            placeholder="# Reps"
            value={reps}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="exercise-load">
          <input
            type="number"
            name="rpe"
            id="rpe"
            placeholder="@ RPE"
            value={rpe}
            onChange={handleChange}
            disabled={percentage !== ""}
            min="0"
            max="10"
          />
          <input
            type="number"
            name="percentage"
            id="percentage"
            placeholder="%"
            value={percentage}
            onChange={handleChange}
            min="0"
            disabled={rpe !== ""}
            max="100"
          />
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
