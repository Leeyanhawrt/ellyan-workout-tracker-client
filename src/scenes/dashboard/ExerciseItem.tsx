import { useUserMaxes } from "../../contexts/UserMaxesContext";
import { calculateWeight } from "../../utils/calculateLifts";
import { FaRegTrashCan } from "react-icons/fa6";
const LIFTS_TO_CALCULATE = ["benchpress", "squat", "deadlift"];
import "/src/assets/stylesheets/components/_Exercise.scss";
import classNames from "classnames";
import { deleteData } from "../../utils/api";
import { useUser } from "../../contexts/UserContext";

interface ExerciseItemProps {
  exerciseList: Exercise[];
  edittable?: boolean;
  type: string;
  removeExercise: (exerciseIndex: number) => void;
}

interface Exercise {
  id: number;
  name: string;
  numberSets: number;
  numberReps: number;
  rpe: number;
  percentage: number;
  type: string;
  variant: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exerciseList,
  edittable,
  removeExercise,
  type,
}) => {
  const userMaxes = useUserMaxes();
  const user = useUser();

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (exerciseId: number) => {
    const response = await deleteData(
      `/admin/workout_programs/exercise/${exerciseId}`,
      true
    );

    if (response?.status === 200) {
      removeExercise(exerciseId);
    }
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
          const { name, percentage, numberReps, numberSets, rpe, variant } =
            exercise;

          const calculatedWeight = LIFTS_TO_CALCULATE.includes(variant)
            ? calculateWeight(variant, percentage, userMaxes, user.roundDown)
            : undefined;

          const repsAndRpeText = rpe ? `@ ${rpe} RPE` : "";
          const calculatedWeightText = calculatedWeight
            ? `${calculatedWeight}lbs x `
            : "";
          const percentageText =
            edittable && percentage ? `@ ${percentage}%` : "";

          const exerciseScheme = `${calculatedWeightText}${numberSets} Sets x ${numberReps} Reps ${repsAndRpeText} ${percentageText}`;

          return (
            <div key={exercise.id}>
              {index === 0 && <h5>{name}</h5>}
              <div className="exercise-description">
                <p>{exerciseScheme}</p>
                {edittable && (
                  <FaRegTrashCan
                    onClick={() => handleDelete(exercise.id)}
                    className="exercise-item-delete"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExerciseItem;
