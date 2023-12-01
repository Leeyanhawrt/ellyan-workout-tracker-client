interface UserMaxes {
  squat: number | undefined;
  bench: number | undefined;
  deadlift: number | undefined;
  [key: string]: number | undefined;
}

export const calculateWeight = (
  exercise: string,
  percentage: number,
  userMaxes: UserMaxes
) => {
  if (!["squat", "bench press", "deadlift"].includes(exercise.toLowerCase())) {
    return;
  }

  const record =
    exercise.toLocaleLowerCase() !== "bench press"
      ? userMaxes[exercise.toLowerCase()]
      : userMaxes["bench"];

  if (record !== undefined) {
    const calculatedWeight = Math.floor((record * (percentage * 0.01)) / 5) * 5;

    return calculatedWeight;
  }
};
