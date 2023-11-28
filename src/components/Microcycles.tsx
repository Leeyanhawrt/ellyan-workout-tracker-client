import "../assets/stylesheets/components/_Microcycle.scss";
import { RiArrowRightSLine } from "react-icons/ri";

interface MicrocycleProps {
  microcycles: Microcycle[];
}

interface Microcycle {
  id: number;
  microcycleNumber: number;
}

const Microcycle: React.FC<MicrocycleProps> = ({ microcycles }) => {
  return (
    <div className="microcycles-container">
      {microcycles.map((microcycle) => {
        return (
          <div className="microcycle-week">
            <h4>{`WK ${microcycle.microcycleNumber}`}</h4>
            <RiArrowRightSLine className="microcycle-icon" />
          </div>
        );
      })}
    </div>
  );
};

export default Microcycle;
