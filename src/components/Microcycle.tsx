import "../assets/stylesheets/components/_Microcycle.scss";
import DailyWorkout from "./DailyWorkout";

interface MicrocycleProps {}

const Microcycle: React.FC<MicrocycleProps> = ({}) => {
  return (
    <div>
      Microcycle
      <DailyWorkout />
    </div>
  );
};

export default Microcycle;
