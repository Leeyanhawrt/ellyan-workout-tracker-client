import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";
import { DailyWorkout } from "../scenes/dashboard/DailyWorkout";

interface DailyWorkoutProviderProps {
  children: ReactNode;
}

type DailyWorkoutContextType = {
  dailyWorkoutList: DailyWorkout[];
  setDailyWorkout: (value: DailyWorkout[]) => void;
};

const defaultValue: DailyWorkoutContextType = {
  dailyWorkoutList: [],
  setDailyWorkout: () => {},
};

const DailyWorkoutContext = createContext(defaultValue);

export function useDailyWorkout() {
  return useContext(DailyWorkoutContext);
}

export function DailyWorkoutProvider({ children }: DailyWorkoutProviderProps) {
  const [dailyWorkoutList, setDailyWorkoutListState] = useState<DailyWorkout[]>(
    []
  );

  const setDailyWorkout = (value: DailyWorkout[]) => {
    setDailyWorkoutListState(value);
  };

  const contextValue: DailyWorkoutContextType = {
    dailyWorkoutList,
    setDailyWorkout,
  };

  return (
    <DailyWorkoutContext.Provider value={contextValue}>
      {children}
    </DailyWorkoutContext.Provider>
  );
}
