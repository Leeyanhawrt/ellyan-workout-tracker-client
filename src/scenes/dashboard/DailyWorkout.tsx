import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import useAxios from "../../hooks/useAxios";

interface DailyWorkoutProps {
  activeMicrocycle: number;
  resetCarousel: boolean;
  revertCarouselReset: () => void;
  edittable?: boolean;
}

type DailyWorkout = {
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
  const [dailyWorkoutList, setDailyWorkoutList] = useState<DailyWorkout[]>([]);

  const { data, loading, fetchData } = useAxios<DailyWorkout[]>(
    [],
    `/workout_program/daily_workout/${activeMicrocycle}`,
    `Daily Workout`,
    true
  );

  const appendDailyWorkout = (newDailyWorkout: DailyWorkout) => {
    setDailyWorkoutList([...dailyWorkoutList, newDailyWorkout]);
  };

  useEffect(() => {
    fetchData();
  }, [activeMicrocycle]);

  useEffect(() => {
    setDailyWorkoutList(data);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Carousel
        revertCarouselReset={revertCarouselReset}
        resetCarousel={resetCarousel}
        items={dailyWorkoutList}
        dailyWorkout
        edittable={edittable}
        handleAdd={appendDailyWorkout}
        microcycleId={activeMicrocycle}
      />
    </>
  );
};

export default DailyWorkout;
