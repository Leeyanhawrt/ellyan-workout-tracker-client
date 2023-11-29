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
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise }) => {
  return <div>{exercise.name}</div>;
};

export default ExerciseItem;
