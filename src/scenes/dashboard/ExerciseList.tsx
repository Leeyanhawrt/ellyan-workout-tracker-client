import { useEffect } from "react";
import ExerciseItem from "./ExerciseItem";
import DailyWorkout from "./DailyWorkout";
import "/src/assets/stylesheets/components/_Exercise.scss";
import Skeleton from "../../components/Skeleton";
import useAxios from "../../hooks/useAxios";

interface ExerciseListProps {
  dailyWorkout: DailyWorkout;
}

interface Exercise {
  id: number;
  name: string;
  numberSets: number;
  numberReps: number;
  rpe: number;
  percentage: number;
  type: string;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ dailyWorkout }) => {
  const {
    data: exerciseList,
    loading,
    fetchData,
  } = useAxios<Exercise[]>(
    [],
    `/workout_program/exercise-list/${dailyWorkout.id}`,
    `Exercise List`,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Skeleton times={6} boxHeight="6.4rem" boxWidth="20.4rem" />;
  }

  return (
    <div id="exercise-list-container">
      <h3>{`Day ${dailyWorkout.dayNumber}`}</h3>
      {exerciseList.map((exercise) => {
        return <ExerciseItem key={exercise.id} exercise={exercise} />;
      })}
    </div>
  );
};

export default ExerciseList;
