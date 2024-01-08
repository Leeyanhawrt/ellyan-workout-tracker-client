import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import useAxios from "../../hooks/useAxios";
import { postData } from "../../utils/api";

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

  const { data, loading, fetchData } = useAxios<DailyWorkout[]>(
    [],
    `/workout_program/daily_workout/${activeMicrocycle}`,
    `Daily Workout`,
    true
  );

  const appendDailyWorkout = (newDailyWorkout: DailyWorkout) => {
    setDailyWorkoutList([...dailyWorkoutList, newDailyWorkout]);
  };

  const testCopy = async () => {
    const response = await postData(
      `/admin/workout_programs/copy_previous_week`,
      { previousMicrocycleId: 33, newMicrocycleId: 34 },
      true
    );
    setDailyWorkoutList(response?.data.dailyWorkouts);
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
    <div>
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
