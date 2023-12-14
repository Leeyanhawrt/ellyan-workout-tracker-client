import { useEffect, useState } from "react";
import ExerciseItem from "./ExerciseItem";
import DailyWorkout from "./DailyWorkout";
import "/src/assets/stylesheets/components/_Exercise.scss";
import Skeleton from "../../components/Skeleton";
import useAxios from "../../hooks/useAxios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface ExerciseListProps {
  dailyWorkout: DailyWorkout;
  edittable?: boolean;
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

const ExerciseList: React.FC<ExerciseListProps> = ({
  dailyWorkout,
  edittable,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const {
    data: exerciseList,
    loading,
    fetchData,
  } = useAxios<Exercise[]>(
    [],
    `/workout_program/exercise_list/${dailyWorkout.id}`,
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
      {edittable && !showEdit ? (
        <div
          onClick={handleShowEdit}
          className="exercise-item-container exercise-item-add"
        >
          <IoIosAddCircleOutline />
        </div>
      ) : (
        ""
      )}
      {showEdit && (
        <div className="exercise-item-container exercise-item-form">
          <MdCancel className="form-cancel" />
          <form>
            <div className="exercise-name">
              <input
                type="text"
                name="exerciseName"
                id="exerciseName"
                placeholder="Exercise Name"
              />
            </div>
            <div className="exercise-scheme">
              <input
                type="number"
                name="numberSets"
                id="numberSets"
                placeholder="# Sets"
              />
              <input
                type="number"
                name="numberReps"
                id="numberReps"
                placeholder="# Reps"
              />
            </div>
            <div className="exercise-load">
              <input
                type="number"
                name="perceivedExhaustion"
                id="perceivedExhaustion"
                placeholder="@ RPE"
              />
              <input
                type="number"
                name="percentage"
                id="percentage"
                placeholder="%"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
