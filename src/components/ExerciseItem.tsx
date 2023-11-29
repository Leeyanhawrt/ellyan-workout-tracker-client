import { useUserMaxes } from "../contexts/UserMaxesContext";
import { calculateWeight } from "../utils/calculateWeight";
const LIFTS_TO_CALCULATE = ["bench press", "squat", "deadlift"];
import "../assets/stylesheets/components/_ExerciseItem.scss";

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
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
  const userMaxes = useUserMaxes();

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  const { name, percentage, numberReps, numberSets, rpe } = exercise;

  const calculatedWeight = LIFTS_TO_CALCULATE.includes(name.toLowerCase())
    ? calculateWeight(name, percentage, userMaxes)
    : undefined;

  const repsAndRpe = rpe ? `@ ${rpe} RPE` : "";
  const calculatedWeightText = calculatedWeight
    ? `${calculatedWeight}lbs x `
    : "";

  const exerciseScheme = `${calculatedWeightText}${numberSets} sets x ${numberReps} reps ${repsAndRpe}`;

  return (
    <div className="exercise-item-container">
      <h5>{exercise.name}</h5>
      <p>{exerciseScheme}</p>
    </div>
  );
};

export default ExerciseItem;
