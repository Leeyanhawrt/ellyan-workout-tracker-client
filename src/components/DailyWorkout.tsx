import "../assets/stylesheets/components/_DailyWorkout.scss";
import ExerciseTile from "./ExerciseTile";

interface DailyWorkoutProps {
  microcycleId: number;
}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({ microcycleId }) => {
  return (
    <div>
      DailyWorkout
      <ExerciseTile />
    </div>
  );
};

export default DailyWorkout;
