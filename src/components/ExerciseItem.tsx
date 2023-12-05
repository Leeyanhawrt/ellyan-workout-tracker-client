import { useUserMaxes } from "../contexts/UserMaxesContext";
import { calculateWeight } from "../utils/calculateLifts";
const LIFTS_TO_CALCULATE = ["bench press", "squat", "deadlift"];
import "../assets/stylesheets/components/_ExerciseItem.scss";
import classNames from "classnames";

interface ExerciseItemProps {
  exercise: Exercise;
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

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
  const userMaxes = useUserMaxes();

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  const { name, percentage, numberReps, numberSets, rpe, type } = exercise;

  const calculatedWeight = LIFTS_TO_CALCULATE.includes(name.toLowerCase())
    ? calculateWeight(name, percentage, userMaxes)
    : undefined;

  const repsAndRpe = rpe ? `@ ${rpe} RPE` : "";
  const calculatedWeightText = calculatedWeight
    ? `${calculatedWeight}lbs x `
    : "";

  const exerciseScheme = `${calculatedWeightText}${numberSets} Sets x ${numberReps} Reps ${repsAndRpe}`;

  const classes = classNames("exercise-item-container", {
    "exercise-item-main": type === "main",
    "exercise-item-accessory": type === "accessory",
    "exercise-item-variant": type === "main variation",
  });

  return (
    <div className={classes}>
      <h5>{exercise.name}</h5>
      <p>{exerciseScheme}</p>
    </div>
  );
};

export default ExerciseItem;
