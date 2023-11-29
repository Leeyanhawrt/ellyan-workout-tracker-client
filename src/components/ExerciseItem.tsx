import { useUserMaxes } from "../contexts/UserMaxesContext";
import { calculateWeight } from "../utils/calculateWeight";

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

  const calculatedLifts = ["bench press", "squat", "deadlift"];

  let calculatedWeight;
  if (calculatedLifts.includes(name.toLowerCase())) {
    calculatedWeight = calculateWeight(name, percentage, userMaxes);
  }

  return (
    <div className="exercise-item-container">
      <h5>{exercise.name}</h5>
      <p>
        {calculatedWeight && `${calculatedWeight}lbs x`} {numberSets} sets x{" "}
        {numberReps} reps {rpe && `@ ${rpe} RPE`}
      </p>
    </div>
  );
};

export default ExerciseItem;
