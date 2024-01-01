import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { Microcycle } from "./Microcycle";
import { useState } from "react";

interface MicrocycleItemProps {
  microcycle: Microcycle;
  onClick: (newMicrocycle: number) => void;
  className: string;
  edittable?: boolean;
}

const MicrocycleItem: React.FC<MicrocycleItemProps> = ({
  microcycle,
  onClick,
  className,
  edittable,
}) => {
  const [phaseInput, setPhaseInput] = useState<string | undefined>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhaseInput(e.target.value);
  };

  return (
    <div onClick={() => onClick(microcycle.id)} className={className}>
      <div className="microcycle-text">
        <h4>{`WK ${microcycle.microcycleNumber}`}</h4>
        <p>{microcycle.phase}</p>
      </div>
      {edittable && (
        <form className="microcycle-form">
          <input
            type="text"
            value={phaseInput}
            placeholder="Phase"
            onChange={handleChange}
          />
        </form>
      )}
    </div>
  );
};

export default MicrocycleItem;
