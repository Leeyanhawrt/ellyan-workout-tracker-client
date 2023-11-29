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
  return <div className="exercise-item-container">{exercise.name}</div>;
};

export default ExerciseItem;
