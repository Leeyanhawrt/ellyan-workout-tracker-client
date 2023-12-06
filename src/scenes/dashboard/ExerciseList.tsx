import { fetchData } from "../../utils/api";
import { useEffect, useState } from "react";
import ExerciseItem from "./ExerciseItem";
import DailyWorkout from "./DailyWorkout";
import "/src/assets/stylesheets/components/_ExerciseList.scss";
import Skeleton from "../../components/Skeleton";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setIsLoading(false);
      } catch (err) {
        console.error("Error Fetching Exercise List:", err);
      }
    };
    setData();
  }, []);

  if (isLoading) {
    return <Skeleton times={6} boxHeight="6.4rem" boxWidth="20.4rem" />;
  }

  return (
    <div className="exercise-list-container">
      <h3>{`Day ${dailyWorkout.dayNumber}`}</h3>
      {exerciseList.map((exercise) => {
        return <ExerciseItem key={exercise.id} exercise={exercise} />;
      })}
    </div>
  );
};

export default ExerciseList;
