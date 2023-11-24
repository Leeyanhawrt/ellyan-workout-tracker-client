import "../assets/stylesheets/components/_WorkoutProgram.scss";
import Mesocycle from "./Mesocycle";

interface WorkoutProgramProps {}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  return (
    <div>
      Workout Plan
      <Mesocycle />
    </div>
  );
};

export default WorkoutProgram;
