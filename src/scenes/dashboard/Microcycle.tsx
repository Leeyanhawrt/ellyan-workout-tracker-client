import "/src/assets/stylesheets/components/_WorkoutProgram.scss";
import { RiArrowRightSLine } from "react-icons/ri";
import DailyWorkout from "./DailyWorkout";
import { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { postData } from "../../utils/api";

interface MicrocycleProps {
  microcycles: Microcycle[];
  edittable?: boolean;
  workoutProgramId?: number | string;
  handleAdd: (newMicrocycle: Microcycle) => void;
}

interface Microcycle {
  id: number;
  microcycleNumber: number;
}

const Microcycle: React.FC<MicrocycleProps> = ({
  microcycles,
  edittable,
  workoutProgramId,
  handleAdd,
}) => {
  const [activeMicrocycle, setActiveMicrocycle] = useState<number>(0);
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

  const updateMicrocycle = (newMicrocycle: number) => {
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
      <div className="microcycles-container">
        {microcycles.map((microcycle) => {
          return (
            <div
              onClick={() => updateMicrocycle(microcycle.id)}
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
        {edittable && (
          <div onClick={addMicrocycle} className="microcycle-add">
            <IoIosAddCircleOutline />
          </div>
        )}
      </div>
      <div className="daily-workout-container">
        <DailyWorkout
          revertCarouselReset={revertReset}
          resetCarousel={resetCarousel}
          activeMicrocycle={activeMicrocycle}
        />
      </div>
    </>
  );
};

export default Microcycle;
