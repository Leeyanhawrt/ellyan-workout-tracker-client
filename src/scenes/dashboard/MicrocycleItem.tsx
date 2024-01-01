import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { Microcycle } from "./Microcycle";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND}/admin/microcycle/${microcycle.id}`,
        {
          phaseInput,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      console.log(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error;
        console.error(errorMessage);
        toast.error(errorMessage);
      } else {
        console.error((err as Error)?.message);
        toast.error((err as Error)?.message);
      }
    }
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
