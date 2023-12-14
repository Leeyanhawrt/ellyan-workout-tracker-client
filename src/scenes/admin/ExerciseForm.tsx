import "/src/assets/stylesheets/components/_Exercise.scss";
import { MdCancel } from "react-icons/md";
import { ChangeEvent, useState } from "react";

type ExerciseForm = {
  exerciseName: string;
  sets: number | string;
  reps: number | string;
  rpe: number | string;
  percentage: number | string;
  [key: string]: number | string;
};

interface ExerciseFormProps {
  handleClose: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ handleClose }) => {
  const [inputs, setInputs] = useState<ExerciseForm>({
    exerciseName: "",
    sets: "",
    reps: "",
    rpe: "",
    percentage: "",
  });

  const { exerciseName, sets, reps, rpe, percentage } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "exerciseName") {
      setInputs({ ...inputs, [name]: value });
      return;
    }

    setInputs({ ...inputs, [e.target.name]: parseInt(e.target.value, 10) });
  };

  return (
    <div className="exercise-item-container exercise-item-form">
      <MdCancel onClick={handleClose} className="form-cancel" />
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
          />
          <input
            type="number"
            name="reps"
            id="reps"
            placeholder="# Reps"
            value={reps}
            onChange={handleChange}
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
          />
          <input
            type="number"
            name="percentage"
            id="percentage"
            placeholder="%"
            value={percentage}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
