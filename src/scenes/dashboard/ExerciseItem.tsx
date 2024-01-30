import "/src/assets/stylesheets/components/_Exercise.scss";
import classNames from "classnames";
import { useState } from "react";
import ExerciseForm from "../admin/ExerciseForm";
import ExerciseDetail from "./ExerciseDetail";

interface ExerciseItemProps {
  exerciseList: Exercise[];
  edittable?: boolean;
  type: string;
  removeExercise: (exerciseIndex: number) => void;
  handleEdit: (exercise: Exercise) => void;
  handleAdd: (newExercise: Exercise) => void;
  dailyWorkoutId: number;
}

export type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  rpe: number;
  percentage: number;
  type: string;
  variant: string;
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exerciseList,
  edittable,
  handleAdd,
  handleEdit,
  removeExercise,
  dailyWorkoutId,
  type,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const closeShowEdit = () => {
    setShowEdit(false);
  };

  const toggleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const classes = classNames("exercise-item-container", {
    "exercise-item-main": type === "main",
    "exercise-item-accessory": type === "accessory",
    "exercise-item-variant": type === "main variation",
  });

  return (
    <>
      <div className={classes}>
        {exerciseList.map((exercise, index) => {
          return (
            <div key={exercise.id}>
              {showEdit ? (
                <ExerciseForm
                  handleClose={closeShowEdit}
                  handleAdd={handleAdd}
                  dailyWorkoutId={dailyWorkoutId}
                  exercise={exercise}
                  handleEdit={handleEdit}
                />
              ) : (
                <ExerciseDetail
                  toggleShowEdit={toggleShowEdit}
                  edittable={edittable}
                  workoutExercise={exercise}
                  index={index}
                  removeExercise={removeExercise}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExerciseItem;
