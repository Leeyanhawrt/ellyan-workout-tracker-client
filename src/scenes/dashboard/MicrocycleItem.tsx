import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { Microcycle } from "./Microcycle";

interface MicrocycleItemProps {
  microcycle: Microcycle;
  onClick: (newMicrocycle: number) => void;
  className: string;
}

const MicrocycleItem: React.FC<MicrocycleItemProps> = ({
  microcycle,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={() => onClick(microcycle.id)}
      key={microcycle.id}
      className={className}
    >
      <div className="microcycle-text">
        <h4>{`WK ${microcycle.microcycleNumber}`}</h4>
        <p>{microcycle.phase}</p>
      </div>
    </div>
  );
};

export default MicrocycleItem;
