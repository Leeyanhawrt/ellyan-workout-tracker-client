import "../assets/stylesheets/components/_DailyWorkout.scss";
import ExerciseTile from "./ExerciseTile";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

interface DailyWorkoutProps {
  microcycleId: number;
}

interface DailyWorkout {
  id: number;
  dayNumber: number;
}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({ microcycleId }) => {
  const [dailyWorkout, setDailyWorkout] = useState<DailyWorkout[]>([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(
          `/workout-program/daily-workout/${microcycleId}`,
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
  }, []);

  return (
    <div className="daily-workout-container">
      {dailyWorkout.map((day) => {
        return <ExerciseTile key={day.id} dailyWorkoutId={day.id} />;
      })}
    </div>
  );
};

export default DailyWorkout;
