import "/src/assets/stylesheets/components/_Exercise.scss";
import { MdCancel } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { putData } from "../../utils/api";
import { MdCheckCircle } from "react-icons/md";
import { Exercise } from "../dashboard/ExerciseList";
import { toast } from "react-toastify";

type ExerciseForm = {
  id: number | string;
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
  handleAdd?: (newExercise: Exercise) => void;
  handleEdit?: (id: number, exercise: Exercise) => void;
  exercise?: Exercise;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  handleClose,
  dailyWorkoutId,
  handleAdd,
  handleEdit,
  exercise,
}) => {
  const [inputs, setInputs] = useState<ExerciseForm>({
    id: exercise?.id || "",
    exerciseName: exercise?.name || "",
    sets: exercise?.numberSets || "",
    reps: exercise?.numberReps || "",
    rpe: exercise?.rpe || "",
    percentage: exercise?.percentage || "",
    dailyWorkoutId: dailyWorkoutId,
  });

  const { exerciseName, sets, reps, rpe, percentage } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "exerciseName") {
      setInputs({ ...inputs, [name]: value });
      return;
    }

    setInputs({
      ...inputs,
      [e.target.name]: parseFloat(e.target.value) || "",
    });
  };

  const validateDecimal = () => {
    const decimalRegex = /^(|([1-9]|10|10\.0|10\.5|[1-9](\.0|\.5)?))$/;

    const isValid = decimalRegex.test(rpe.toString());
    return isValid;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = validateDecimal();

    if (!isValid && !percentage) {
      toast.error(
        "Invalid RPE input. Please enter a number between 1 and 10, in 0.5 increments."
      );
      return;
    }

    const response = await putData(
      `/admin/workout_programs/exercise`,
      { ...inputs },
      true
    );

    const { exercise, dailyWorkoutId } = response?.data;

    if (response?.status === 201) {
      handleAdd!(exercise);
    }

    if (response?.status === 200) {
      handleEdit!(dailyWorkoutId, exercise);
    }

    handleClose();
  };

  return (
    <div className="exercise-item-container exercise-item-form">
      <div className="icon-container">
        <MdCheckCircle className="form-icon" onClick={handleSubmit} />
        <MdCancel onClick={handleClose} className="form-icon" />
      </div>
      <form onSubmit={handleSubmit}>
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
            onBlur={validateDecimal}
            min="0"
            max="10"
            step="0.5"
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
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </div>
  );
};

export default ExerciseForm;
