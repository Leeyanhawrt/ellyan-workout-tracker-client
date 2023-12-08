import { useEffect } from "react";
import Carousel from "../../components/Carousel";
import useAxios from "../../hooks/useAxios";

interface DailyWorkoutProps {
  activeMicrocycle: number;
  resetCarousel: boolean;
  revertCarouselReset: () => void;
}

interface DailyWorkout {
  id: number;
  dayNumber: number;
  microcycleId: number;
}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({
  activeMicrocycle,
  resetCarousel,
  revertCarouselReset,
}) => {
  const {
    data: dailyWorkout,
    loading,
    fetchData,
  } = useAxios<DailyWorkout[]>(
    [],
    `/workout-program/daily-workout/${activeMicrocycle}`,
    `Daily Workout`,
    true
  );

  useEffect(() => {
    fetchData();
  }, [activeMicrocycle]);

  if (dailyWorkout.length === 0 || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Carousel
        revertCarouselReset={revertCarouselReset}
        resetCarousel={resetCarousel}
        items={dailyWorkout}
        dailyWorkout
      />
    </>
  );
};

export default DailyWorkout;
