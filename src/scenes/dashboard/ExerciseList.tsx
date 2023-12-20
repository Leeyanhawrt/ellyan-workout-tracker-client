import { useEffect, useState } from "react";
import ExerciseItem from "./ExerciseItem";
import DailyWorkout from "./DailyWorkout";
import "/src/assets/stylesheets/components/_Exercise.scss";
import Skeleton from "../../components/Skeleton";
import useAxios from "../../hooks/useAxios";
import { IoIosAddCircleOutline } from "react-icons/io";
import ExerciseForm from "../admin/ExerciseForm";

interface ExerciseListProps {
  dailyWorkout: DailyWorkout;
  edittable?: boolean;
}

export type Exercise = {
  id: number;
  name: string;
  numberSets: number;
  numberReps: number;
  rpe: number;
  percentage: number;
  type: string;
  variant: string;
};

export type GroupedExercises = {
  [exerciseName: string]: Exercise[];
};

const ExerciseList: React.FC<ExerciseListProps> = ({
  dailyWorkout,
  edittable,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  const openShowEdit = () => {
    setShowEdit(true);
  };

  const closeShowEdit = () => {
    setShowEdit(false);
  };

  const { data, loading, fetchData } = useAxios<Exercise[]>(
    [],
    `/workout_program/exercise_list/${dailyWorkout.id}`,
    `Exercise List`,
    true
  );

  console.log(exerciseList);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setExerciseList(data);
  }, [data]);

  const groupedExercises: GroupedExercises = exerciseList.reduce(
    (result, exercise) => {
      const exerciseName = exercise.name;

      if (!result[exerciseName]) {
        result[exerciseName] = [];
      }

      result[exerciseName].push(exercise);

      return result;
    },
    {} as GroupedExercises
  );

  const appendExercise = (newExercise: Exercise) => {
    setExerciseList([...exerciseList, newExercise]);
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedExercises = exerciseList.filter((exercise) => {
      return exercise.id !== exerciseIndex;
    });
    setExerciseList(updatedExercises);
  };

  if (loading) {
    return <Skeleton times={6} boxHeight="6.4rem" boxWidth="20.4rem" />;
  }

  return (
    <div id="exercise-list-container">
      <h3>{`Day ${dailyWorkout.dayNumber}`}</h3>
      {Object.entries(groupedExercises).map(([key, exercise]) => {
        return (
          <ExerciseItem
            key={key}
            exerciseList={exercise}
            edittable={edittable}
            removeExercise={removeExercise}
            type={exercise[0].type}
          />
        );
      })}
      {edittable && !showEdit ? (
        <div
          onClick={openShowEdit}
          className="exercise-item-container exercise-item-add"
        >
          <IoIosAddCircleOutline />
        </div>
      ) : (
        ""
      )}
      {showEdit && (
        <ExerciseForm
          handleAdd={appendExercise}
          dailyWorkoutId={dailyWorkout.id}
          handleClose={closeShowEdit}
        />
      )}
    </div>
  );
};

export default ExerciseList;
