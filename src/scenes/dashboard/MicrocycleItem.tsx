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
  const [input, setInput] = useState<string | undefined>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div onClick={() => onClick(microcycle.id)} className={className}>
      <div className="microcycle-text">
        <h4>{`WK ${microcycle.microcycleNumber}`}</h4>
        <p>{microcycle.phase}</p>
      </div>
      {edittable && (
        <form>
          <input
            className="microcycle-input"
            type="text"
            value={input}
            placeholder="Phase"
            onChange={handleChange}
          />
        </form>
      )}
    </div>
  );
};

export default MicrocycleItem;
