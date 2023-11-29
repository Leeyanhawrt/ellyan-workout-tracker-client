import "../assets/stylesheets/components/_ExerciseList.scss";
import { fetchData } from "../utils/api";
import { useEffect, useState } from "react";
import ExerciseItem from "./ExerciseItem";

interface ExerciseListProps {
  dailyWorkoutId: number;
}

interface Exercises {
  id: number;
  name: string;
  numberSets: number;
  numberReps: number;
  rpe: number;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ dailyWorkoutId }) => {
  const [exerciseList, setExerciseList] = useState<Exercises[]>([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(
          `/workout-program/exercise-list/${dailyWorkoutId}`,
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
      {exerciseList.map((exercise) => {
        return <ExerciseItem key={exercise.id} exercise={exercise} />;
      })}
    </div>
  );
};

export default ExerciseList;
