import { Exercise } from "./ExerciseItem";
import { calculateWeight } from "../../utils/calculateLifts";
import { FaRegTrashCan } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import { useUserMaxes } from "../../contexts/UserMaxesContext";
import { useState, useEffect } from "react";
import { deleteData } from "../../utils/api";
import useAxios from "../../hooks/useAxios";
import { useImpersonateUser } from "../../contexts/ImpersonateUserContext";
const LIFTS_TO_CALCULATE = ["benchpress", "squat", "deadlift"];

interface ExerciseDetailProps {
  workoutExercise: Exercise;
  index: number;
  edittable?: boolean;
  toggleShowEdit: () => void;
  removeExercise: (exerciseId: number) => void;
}

type UserWorkout = {
  rpe?: number[];
};

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  workoutExercise,
  index,
  edittable,
  toggleShowEdit,
  removeExercise,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [userWorkout, setUserWorkout] = useState<UserWorkout | null>(null);

  const impersonateUser = useImpersonateUser();

  const userMaxes = useUserMaxes();
  const user = useUser();

  const userRpeId = impersonateUser ? impersonateUser.id : user?.id;

  const { data, loading, fetchData } = useAxios<Partial<UserWorkout>>(
    {},
    `/workout_program/user_workout/${userRpeId}/${workoutExercise.id}`,
    `Exercise List`,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setUserWorkout(data);
  }, [data]);

  const toggleConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const handleDelete = async (exerciseId: number) => {
    const response = await deleteData(
      `/admin/workout_programs/exercise/${exerciseId}`,
      true
    );

    if (response?.status === 200) {
      removeExercise(exerciseId);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, percentage, reps, sets, rpe, variant } = workoutExercise;

  const calculatedWeight = LIFTS_TO_CALCULATE.includes(variant)
    ? calculateWeight(variant, percentage, userMaxes, user.roundDown)
    : undefined;

  const rpeText = rpe ? `@ ${rpe} RPE` : "";
  const calculatedWeightText =
    calculatedWeight && !edittable ? `${calculatedWeight}lbs x ` : "";
  const percentageText = edittable && percentage ? `@ ${percentage}%` : "";
  const userRpe =
    userWorkout?.rpe && userWorkout.rpe.length && !edittable
      ? `[${userWorkout.rpe}]`
      : "";

  const exerciseScheme = `${calculatedWeightText}${sets} Sets x ${reps} Reps ${rpeText} ${userRpe} ${percentageText}`;

  return (
    <>
      {index === 0 && <h5>{name}</h5>}
      <div className="exercise-description">
        <p>{exerciseScheme}</p>
        {edittable && !showConfirmation ? (
          <div className="icon-container">
            <FaRegTrashCan
              onClick={toggleConfirmation}
              className="exercise-item-icon"
            />
            <FaEdit className="exercise-item-icon" onClick={toggleShowEdit} />
          </div>
        ) : (
          ""
        )}
        {showConfirmation && (
          <div className="icon-container">
            <FcCheckmark
              onClick={() => handleDelete(workoutExercise.id)}
              className="exercise-item-icon"
            />
            <FcCancel
              onClick={toggleConfirmation}
              className="exercise-item-icon"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ExerciseDetail;
