import "../assets/stylesheets/components/_WorkoutProgram.scss";
import Mesocycle from "./Mesocycle";
import Carousel from "./Carousel";

interface WorkoutProgramProps {}

const WorkoutProgram: React.FC<WorkoutProgramProps> = ({}) => {
  return (
    <div className="content-container">
      Workout Plan
      <Mesocycle />
      <Carousel />
    </div>
  );
};

export default WorkoutProgram;
