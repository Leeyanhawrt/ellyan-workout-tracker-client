import { fetchData } from "../utils/api";
import { useEffect, useState } from "react";
import ExerciseItem from "./ExerciseItem";
import DailyWorkout from "./DailyWorkout";
import "../assets/stylesheets/components/_ExerciseList.scss";

interface ExerciseListProps {
  dailyWorkout: DailyWorkout;
}

interface Exercises {
  id: number;
  name: string;
  numberSets: number;
  numberReps: number;
  rpe: number;
  percentage: number;
  type: string;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ dailyWorkout }) => {
  const [exerciseList, setExerciseList] = useState<Exercises[]>([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(
          `/workout-program/exercise-list/${dailyWorkout.id}`,
          "Exercise List",
          true
        );

        const data: Exercises[] = response.data;
        setExerciseList(data);
      } catch (err) {
        console.error("Error Fetching Exercise List:", err);
      }
    };
    setData();
  }, []);

  return (
    <div className="exercise-list-container">
      <h2>{`Day ${dailyWorkout.dayNumber}`}</h2>
      {exerciseList.map((exercise) => {
        return <ExerciseItem key={exercise.id} exercise={exercise} />;
      })}
    </div>
  );
};

export default ExerciseList;
