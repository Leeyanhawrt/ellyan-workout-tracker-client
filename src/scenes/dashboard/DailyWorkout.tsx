import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import Carousel from "../../components/Carousel";

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
  const [dailyWorkout, setDailyWorkout] = useState<DailyWorkout[]>([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(
          `/workout-program/daily-workout/${activeMicrocycle}`,
          "Daily Workout",
          true
        );

        const data: DailyWorkout[] = response.data;

        setDailyWorkout(data);
      } catch (err) {
        console.error("Error Fetching Daily Workouts:", err);
      }
    };
    setData();
  }, [activeMicrocycle]);

  if (dailyWorkout.length === 0) {
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
