import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import useAxios from "../../hooks/useAxios";

interface DailyWorkoutProps {
  activeMicrocycle: number;
  resetCarousel: boolean;
  revertCarouselReset: () => void;
  edittable?: boolean;
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
  edittable,
}) => {
  const [dailyWorkoutList, setDailyWorkoutList] = useState<DailyWorkout[]>([]);

  const { data, loading, error, fetchData } = useAxios<DailyWorkout[]>(
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
    console.log("Fetching Data");
  }, [activeMicrocycle]);

  useEffect(() => {
    console.log("Setting Data");
    setDailyWorkoutList(data);
  }, [data]);

  if (error) {
    console.log(error);
  }

  if (loading || !data.length) {
    return <div>Loading...</div>;
  }

  console.log("Data Changed");

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
