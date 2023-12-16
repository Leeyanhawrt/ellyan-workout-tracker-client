import { useUserMaxes } from "../../contexts/UserMaxesContext";
import { calculateWeight } from "../../utils/calculateLifts";
import { FaRegTrashCan } from "react-icons/fa6";
const LIFTS_TO_CALCULATE = ["benchpress", "squat", "deadlift"];
import "/src/assets/stylesheets/components/_Exercise.scss";
import classNames from "classnames";

interface ExerciseItemProps {
  exercise: Exercise;
  edittable?: boolean;
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

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, edittable }) => {
  const userMaxes = useUserMaxes();

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  const { name, percentage, numberReps, numberSets, rpe, type } = exercise;

  const exerciseName = name.toLowerCase().replace(/ /g, "");

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
      {edittable && <FaRegTrashCan className="exercise-item-delete" />}
    </div>
  );
};

export default ExerciseItem;
