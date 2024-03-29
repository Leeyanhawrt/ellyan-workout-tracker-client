import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import DailyWorkout from "./DailyWorkout";
import { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { postData } from "../../utils/api";
import MicrocycleItem from "./MicrocycleItem";
import { useMicrocycles } from "../../contexts/MicrocyclesContext";
import { DailyWorkoutProvider } from "../../contexts/DailyWorkoutContext";

interface MicrocycleProps {
  microcycles: Microcycle[];
  edittable?: boolean;
  workoutProgramId?: number | string;
  handleAdd: (newMicrocycle: Microcycle) => void;
  updateMicrocycle: (id: number, newPhase: string) => void;
}

export type Microcycle = {
  id: number;
  microcycleNumber: number;
  phase: string;
};

const Microcycle: React.FC<MicrocycleProps> = ({
  microcycles,
  edittable,
  workoutProgramId,
  handleAdd,
  updateMicrocycle,
}) => {
  const { activeMicrocycle, setActiveMicrocycle } = useMicrocycles();

  const [resetCarousel, setResetCarousel] = useState<boolean>(false);

  useEffect(() => {
    if (microcycles.length > 0) {
      setActiveMicrocycle(microcycles[0].id);
    }
  }, [microcycles]);

  const carouselReset = () => {
    setResetCarousel(true);
  };

  const revertReset = () => {
    setResetCarousel(false);
  };

  const updateActiveMicrocycle = (newMicrocycle: number) => {
    setActiveMicrocycle(newMicrocycle);
    carouselReset();
  };

  const addMicrocycle = async () => {
    const response = await postData(
      `/admin/workout_programs/microcycle`,
      { microcycleNumber: microcycles.length, workoutProgramId },
      true
    );
    handleAdd(response?.data.microcycle);
  };

  return (
    <>
      <DailyWorkoutProvider>
        <div className="microcycles-container">
          {microcycles.map((microcycle) => {
            return (
              <MicrocycleItem
                onClick={updateActiveMicrocycle}
                key={microcycle.id}
                microcycle={microcycle}
                updateMicrocycle={updateMicrocycle}
                edittable={edittable}
                className={`microcycle-week ${
                  microcycle.id === activeMicrocycle
                    ? "microcycle-week-active"
                    : ""
                }`}
              />
            );
          })}
          {edittable && (
            <div onClick={addMicrocycle} className="microcycle-add">
              <IoIosAddCircleOutline />
            </div>
          )}
        </div>
        <div className="daily-workout-container">
          <DailyWorkout
            edittable={edittable}
            revertCarouselReset={revertReset}
            resetCarousel={resetCarousel}
            activeMicrocycle={activeMicrocycle}
          />
        </div>
      </DailyWorkoutProvider>
    </>
  );
};

export default Microcycle;
