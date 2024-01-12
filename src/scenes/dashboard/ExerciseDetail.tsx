import { Exercise } from "./ExerciseItem";
import { calculateWeight } from "../../utils/calculateLifts";
import { FaRegTrashCan } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import { useUserMaxes } from "../../contexts/UserMaxesContext";
import { useState } from "react";
import { deleteData } from "../../utils/api";
const LIFTS_TO_CALCULATE = ["benchpress", "squat", "deadlift"];

interface ExerciseDetailProps {
  exercise: Exercise;
  index: number;
  edittable?: boolean;
  toggleShowEdit: () => void;
  removeExercise: (exerciseId: number) => void;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  exercise,
  index,
  edittable,
  toggleShowEdit,
  removeExercise,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const userMaxes = useUserMaxes();
  const user = useUser();

  const toggleConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const handleDelete = async (exerciseId: number) => {
    const response = await deleteData(
      `/admin/workout_programs/exercise/${exerciseId}`,
      true
    );

    if (response?.status === 200) {
      removeExercise(exerciseId);
    }
  };

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, percentage, reps, sets, rpe, variant } = exercise;

  const calculatedWeight = LIFTS_TO_CALCULATE.includes(variant)
    ? calculateWeight(variant, percentage, userMaxes, user.roundDown)
    : undefined;

  const repsAndRpeText = rpe ? `@ ${rpe} RPE` : "";
  const calculatedWeightText = calculatedWeight
    ? `${calculatedWeight}lbs x `
    : "";
  const percentageText = edittable && percentage ? `@ ${percentage}%` : "";

  const exerciseScheme = `${calculatedWeightText}${sets} Sets x ${reps} Reps ${repsAndRpeText} ${percentageText}`;

  return (
    <div>
      {index === 0 && <h5>{name}</h5>}
      <div className="exercise-description">
        <p>{exerciseScheme}</p>
        {edittable && !showConfirmation ? (
          <div className="icon-container">
            <FaRegTrashCan
              onClick={toggleConfirmation}
              className="exercise-item-icon"
            />
            <FaEdit className="exercise-item-icon" onClick={toggleShowEdit} />
          </div>
        ) : (
          ""
        )}
        {showConfirmation && (
          <div className="icon-container">
            <FcCheckmark
              onClick={() => handleDelete(exercise.id)}
              className="exercise-item-icon"
            />
            <FcCancel
              onClick={toggleConfirmation}
              className="exercise-item-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;
