import "../assets/stylesheets/components/_DailyWorkout.scss";
import ExerciseTile from "./ExerciseTile";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const fetchData = async () => {
      try {
        const response = await fetchDailyWorkout();
        const data: DailyWorkout[] = response.data;
        setDailyWorkout(data);
      } catch (err) {
        console.error("Error fetching daily workouts:", err);
      }
    };
    fetchData();
  }, []);

  const fetchDailyWorkout = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_BACKEND
      }/workout-program/daily-workout/${microcycleId}`,
      {
        headers: { token: localStorage.token },
      }
    );

    return response;
  };

  return (
    <div>
      DailyWorkout
      <ExerciseTile />
    </div>
  );
};

export default DailyWorkout;
