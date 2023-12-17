import { useUserMaxes } from "../../contexts/UserMaxesContext";
import { calculateWeight } from "../../utils/calculateLifts";
import { FaRegTrashCan } from "react-icons/fa6";
const LIFTS_TO_CALCULATE = ["benchpress", "squat", "deadlift"];
import "/src/assets/stylesheets/components/_Exercise.scss";
import classNames from "classnames";
import { deleteData } from "../../utils/api";
import { GroupedExercises } from "./ExerciseList";

interface ExerciseItemProps {
  exercise: GroupedExercises;
  edittable?: boolean;
  removeExercise: (exerciseIndex: number) => void;
}

interface Exercise {
  id: number;
  name: string;
  numberSets: number;
  numberReps: number;
  rpe: number;
  percentage: number;
  type: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  edittable,
  removeExercise,
}) => {
  const userMaxes = useUserMaxes();

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    const response = await deleteData(
      `/admin/workout_programs/exercise/${exercise.id}`,
      true
    );

    if (response?.status === 200) {
      removeExercise(exercise.id);
    }
  };

  const { name, percentage, numberReps, numberSets, rpe, type } = exercise;

  const exerciseName = name?.toLowerCase().replace(/ /g, "");

  const calculatedWeight = LIFTS_TO_CALCULATE.includes(exerciseName)
    ? calculateWeight(exerciseName, percentage, userMaxes)
    : undefined;

  const repsAndRpeText = rpe ? `@ ${rpe} RPE` : "";
  const calculatedWeightText = calculatedWeight
    ? `${calculatedWeight}lbs x `
    : "";
  const percentageText = edittable && percentage ? `@ ${percentage}%` : "";

  const exerciseScheme = `${calculatedWeightText}${numberSets} Sets x ${numberReps} Reps ${repsAndRpeText} ${percentageText}`;

  const classes = classNames("exercise-item-container", {
    "exercise-item-main": type === "main",
    "exercise-item-accessory": type === "accessory",
    "exercise-item-variant": type === "main variation",
  });

  return (
    <div className={classes}>
      <h5>{exercise.name}</h5>
      <p>{exerciseScheme}</p>
      {edittable && (
        <FaRegTrashCan
          onClick={handleDelete}
          className="exercise-item-delete"
        />
      )}
    </div>
  );
};

export default ExerciseItem;
