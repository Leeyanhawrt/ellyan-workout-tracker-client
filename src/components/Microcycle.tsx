import "../assets/stylesheets/components/_Microcycle.scss";
import { RiArrowRightSLine } from "react-icons/ri";
import DailyWorkout from "./DailyWorkout";
import { useState, useEffect } from "react";

interface MicrocycleProps {
  microcycles: Microcycle[];
}

interface Microcycle {
  id: number;
  microcycleNumber: number;
}

const Microcycle: React.FC<MicrocycleProps> = ({ microcycles }) => {
  const [activeMicrocycle, setActiveMicrocycle] = useState<number>(0);

  useEffect(() => {
    if (microcycles.length > 0) {
      setActiveMicrocycle(microcycles[0].id);
    }
  }, [microcycles]);

  const updateMesocycle = (newMesocycle: number) => {
    setActiveMicrocycle(newMesocycle);
  };

  return (
    <>
      <div className="microcycles-container">
        {microcycles.map((microcycle) => {
          return (
            <div
              onClick={() => updateMesocycle(microcycle.id)}
              key={microcycle.id}
              className={`microcycle-week ${
                microcycle.id === activeMicrocycle
                  ? "microcycle-week-active"
                  : ""
              }`}
            >
              <h4>{`WK ${microcycle.microcycleNumber}`}</h4>
              <RiArrowRightSLine className="microcycle-icon" />
            </div>
          );
        })}
      </div>
      <div className="daily-workout-container">
        <DailyWorkout activeMicrocycle={activeMicrocycle} />
      </div>
    </>
  );
};

export default Microcycle;
