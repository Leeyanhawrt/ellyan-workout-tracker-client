import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { Microcycle } from "./Microcycle";
import { useState } from "react";
import { putData } from "../../utils/api";

interface MicrocycleItemProps {
  microcycle: Microcycle;
  onClick: (newMicrocycle: number) => void;
  className: string;
  edittable?: boolean;
  updateMicrocycle: (id: number, newPhase: string) => void;
}

const MicrocycleItem: React.FC<MicrocycleItemProps> = ({
  microcycle,
  onClick,
  className,
  edittable,
  updateMicrocycle,
}) => {
  const [phaseInput, setPhaseInput] = useState<string | undefined>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhaseInput(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await putData(
      `/admin/workout_programs/microcycle/${microcycle.id}`,
      { phaseInput },
      true
    );

    const { id, phase } = response?.data.microcycle;
    updateMicrocycle(id, phase);
  };

  return (
    <div onClick={() => onClick(microcycle.id)} className={className}>
      <div className="microcycle-text">
        <h4>{`WK ${microcycle.microcycleNumber}`}</h4>
        <p>{microcycle.phase}</p>
      </div>
      {edittable && (
        <form className="microcycle-form" onSubmit={handleSubmit}>
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
