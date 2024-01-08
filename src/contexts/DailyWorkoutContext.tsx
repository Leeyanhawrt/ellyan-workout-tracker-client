import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";
import { DailyWorkout } from "../scenes/dashboard/DailyWorkout";

interface DailyWorkoutProviderProps {
  children: ReactNode;
}

type DailyWorkoutContextType = {
  dailyWorkoutList: DailyWorkout[];
  setDailyWorkoutList: (value: DailyWorkout[]) => void;
};

const defaultValue: DailyWorkoutContextType = {
  dailyWorkoutList: [],
  setDailyWorkoutList: () => {},
};

const DailyWorkoutContext = createContext(defaultValue);

export function useDailyWorkout() {
  return useContext(DailyWorkoutContext);
}

export function DailyWorkoutProvider({ children }: DailyWorkoutProviderProps) {
  const [dailyWorkoutList, setDailyWorkoutListState] = useState<DailyWorkout[]>(
    []
  );

  const setDailyWorkoutList = (value: DailyWorkout[]) => {
    setDailyWorkoutListState(value);
  };

  const contextValue: DailyWorkoutContextType = {
    dailyWorkoutList,
    setDailyWorkoutList,
  };

  return (
    <DailyWorkoutContext.Provider value={contextValue}>
      {children}
    </DailyWorkoutContext.Provider>
  );
}
