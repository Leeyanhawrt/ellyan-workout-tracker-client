import "../assets/stylesheets/components/_DailyWorkout.scss";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import Carousel from "./Carousel";

interface DailyWorkoutProps {
  activeMicrocycle: number;
}

interface DailyWorkout {
  id: number;
  dayNumber: number;
  microcycleId: number;
}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({ activeMicrocycle }) => {
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
      <Carousel items={dailyWorkout} dailyWorkout />
    </>
  );
};

export default DailyWorkout;
