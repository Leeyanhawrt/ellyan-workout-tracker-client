import { Exercise } from "./ExerciseItem";
import { calculateWeight } from "../../utils/calculateLifts";
import { FaRegTrashCan } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import { useUserMaxes } from "../../contexts/UserMaxesContext";
import { useState, useEffect, ChangeEvent } from "react";
import { deleteData } from "../../utils/api";
import useAxios from "../../hooks/useAxios";
import { useImpersonateUser } from "../../contexts/ImpersonateUserContext";
import { LuTextCursorInput } from "react-icons/lu";
import { putData } from "../../utils/api";
const LIFTS_TO_CALCULATE = ["benchpress", "squat", "deadlift"];

interface ExerciseDetailProps {
  workoutExercise: Exercise;
  index: number;
  edittable?: boolean;
  toggleShowEdit: () => void;
  removeExercise: (exerciseId: number) => void;
}

type UserWorkout = {
  userRpe?: number[] | string;
  [key: string]: string | number[] | undefined;
};

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({
  workoutExercise,
  index,
  edittable,
  toggleShowEdit,
  removeExercise,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showUserWorkout, setShowUserWorkout] = useState<boolean>(false);
  const [userWorkout, setUserWorkout] = useState<UserWorkout | null>(null);
  const [inputs, setInputs] = useState<UserWorkout>({
    userRpe: userWorkout?.userRpe?.toString().replace(/,/g, " ") || "",
  });

  const impersonateUser = useImpersonateUser();

  const userMaxes = useUserMaxes();
  const user = useUser();

  const userRpeId = impersonateUser ? impersonateUser.id : user?.id;

  const { data, loading, fetchData } = useAxios<UserWorkout>(
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

  useEffect(() => {
    for (const key in userWorkout) {
      setInputs({ ...inputs, [key]: userWorkout[key] });
    }
  }, [userWorkout]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await putData(
      `/workout_program/user_workout/${workoutExercise.id}`,
      { ...inputs },
      true
    );

    const { userRpe } = response?.data.userWorkout;

    setUserWorkout({ ...userWorkout, userRpe: userRpe });
  };

  const openUserWorkout = () => {
    setShowUserWorkout(true);
  };

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
    userWorkout?.userRpe && userWorkout.userRpe.length && !edittable
      ? `[${userWorkout.userRpe}]`
      : "";

  const exerciseScheme = `${calculatedWeightText}${sets} Sets x ${reps} Reps ${rpeText} ${userRpe} ${percentageText}`;

  let iconContainer;

  if (edittable && !showConfirmation) {
    iconContainer = (
      <>
        <FaRegTrashCan
          onClick={toggleConfirmation}
          className="exercise-item-icon"
        />
        <FaEdit className="exercise-item-icon" onClick={toggleShowEdit} />
      </>
    );
  } else if (!edittable && !showUserWorkout) {
    iconContainer = (
      <LuTextCursorInput
        className="exercise-item-icon user-workout-icon"
        onClick={openUserWorkout}
      />
    );
  } else if (showConfirmation) {
    iconContainer = (
      <>
        <FcCheckmark
          onClick={() => handleDelete(workoutExercise.id)}
          className="exercise-item-icon"
        />
        <FcCancel onClick={toggleConfirmation} className="exercise-item-icon" />
      </>
    );
  }

  return (
    <>
      {index === 0 && <h5>{name}</h5>}
      <div className="exercise-entry">
        <div className="exercise-description">
          <p>{exerciseScheme}</p>
          <div className="icon-container">{iconContainer}</div>
        </div>
        {!edittable && showUserWorkout && (
          <form onSubmit={handleSubmit}>
            <div className="user-workout-input-container">
              <input
                onChange={handleChange}
                type="text"
                name="userRpe"
                id="userRpe"
                value={inputs.userRpe?.toString().replace(/,/g, " ")}
                placeholder="RPE (e.g. 7 8 9.5)"
              />
            </div>
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        )}
      </div>
    </>
  );
};

export default ExerciseDetail;
