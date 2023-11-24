import "../assets/stylesheets/components/_Mesocycle.scss";
import DailyWorkout from "./DailyWorkout";

interface MesocycleProps {}

const Mesocycle: React.FC<MesocycleProps> = ({}) => {
  return (
    <div>
      Mesocycle
      <DailyWorkout />
    </div>
  );
};

export default Mesocycle;
