import { UserMaxes } from "../contexts/UserMaxesContext";

export const calculateWeight = (
  variant: string,
  percentage: number,
  userMaxes: UserMaxes,
  roundDown: boolean
) => {
  if (!["squat", "benchpress", "deadlift"].includes(variant)) {
    return;
  }

  const record = userMaxes[variant];

  if (record !== undefined) {
    const calculatedWeight = roundDown
      ? Math.floor(((record as number) * (percentage * 0.01)) / 5) * 5
      : Math.floor(((record as number) * (percentage * 0.01)) / 1) * 1;
    return calculatedWeight;
  }
  return;
};

export const calculateDots = (
  gender: string,
  bodyweight: number,
  total: number
) => {
  const kgTotal = total / 2.2;
  const kgBodyweight = bodyweight / 2.2;

  const maleCoefficient = [
    -307.75076, 24.0900756, -0.1918759221, 0.0007391293, -0.000001093,
  ];

  const femaleCoefficient = [
    -57.96288, 13.6175032, -0.1126655495, 0.0005158568, -0.0000010706,
  ];

  let denominator =
    gender === "male" ? maleCoefficient[0] : femaleCoefficient[0];
  const activeCoefficient =
    gender === "male" ? maleCoefficient : femaleCoefficient;

  for (let i = 1; i < activeCoefficient.length; i++) {
    denominator += activeCoefficient[i] * kgBodyweight ** i;
  }

  const dots = (500 / denominator) * kgTotal;
  return dots.toFixed(2);
};
