import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import useAxios from "../../hooks/useAxios";
import { useDailyWorkout } from "../../contexts/DailyWorkoutContext";
import Button from "../../components/Button";
import { Microcycle } from "./Microcycle";
import { postData } from "../../utils/api";
import { useMicrocycles } from "../../contexts/MicrocyclesContext";
import { IoCopy } from "react-icons/io5";

interface DailyWorkoutProps {
  activeMicrocycle: number;
  resetCarousel: boolean;
  revertCarouselReset: () => void;
  edittable?: boolean;
}

export type DailyWorkout = {
  id: number;
  dayNumber: number;
  microcycleId: number;
};

const DailyWorkout: React.FC<DailyWorkoutProps> = ({
  activeMicrocycle,
  resetCarousel,
  revertCarouselReset,
  edittable,
}) => {
  const { dailyWorkoutList, setDailyWorkoutList } = useDailyWorkout();
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  const { microcycles } = useMicrocycles();

  const { data, loading, fetchData } = useAxios<DailyWorkout[]>(
    [],
    `/workout_program/daily_workout/${activeMicrocycle}`,
    `Daily Workout`,
    true
  );

  useEffect(() => {
    fetchData();
    setCopyIndex(findCopyId(microcycles, activeMicrocycle));
  }, [activeMicrocycle]);

  useEffect(() => {
    setDailyWorkoutList(data);
  }, [data]);

  const appendDailyWorkout = (newDailyWorkout: DailyWorkout) => {
    setDailyWorkoutList([...dailyWorkoutList, newDailyWorkout]);
  };

  const copyPreviousWeek = async () => {
    const response = await postData(
      `/admin/workout_programs/copy_previous_week`,
      { previousMicrocycleId: copyIndex, newMicrocycleId: activeMicrocycle },
      true
    );
    response && setDailyWorkoutList(response?.data.dailyWorkouts);
  };

  const findCopyId = (microcycles: Microcycle[], activeMicrocycle: number) => {
    const targetIndex = microcycles.findIndex(
      (microcycle) => microcycle.id === activeMicrocycle
    );

    if (targetIndex > 0) {
      return microcycles[targetIndex - 1].id;
    }

    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="daily-workout-content">
      {dailyWorkoutList.length === 0 && edittable && (
        <div className="copy-container">
          <Button size="small" onClick={copyPreviousWeek}>
            <div className="copy-text">
              Copy From Previous Workout <IoCopy />
            </div>
          </Button>
        </div>
      )}
      <Carousel
        revertCarouselReset={revertCarouselReset}
        resetCarousel={resetCarousel}
        items={dailyWorkoutList}
        dailyWorkout
        edittable={edittable}
        handleAdd={appendDailyWorkout}
        microcycleId={activeMicrocycle}
      />
    </div>
  );
};

export default DailyWorkout;
