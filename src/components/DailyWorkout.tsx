import "../assets/stylesheets/components/_DailyWorkout.scss";
import ExerciseTile from "./ExerciseTile";
import axios from "axios";
import { useEffect, useState } from "react";

interface DailyWorkoutProps {
  microcycleId: number;
}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({ microcycleId }) => {
  useEffect(() => {
    fetchDailyWorkout();
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
