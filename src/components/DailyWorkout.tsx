import "../assets/stylesheets/components/_DailyWorkout.scss";
import ExerciseTile from "./ExerciseTile";

interface DailyWorkoutProps {}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({}) => {
  return (
    <div>
      DailyWorkout
      <ExerciseTile />
    </div>
  );
};

export default DailyWorkout;
