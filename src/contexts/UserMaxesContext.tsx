import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";

interface UserMaxesProviderProps {
  children: ReactNode;
}

export type UserMaxes = {
  squat: number | string;
  bench: number | string;
  deadlift: number | string;
  [key: string]: number | string;
};

type UserMaxesUpdateContextType = (value: UserMaxes) => void;

const UserMaxesContext = createContext<null | UserMaxes>(null);
const UserMaxesUpdateContext = createContext<UserMaxesUpdateContextType>(
  () => {}
);

export function useUserMaxes() {
  return useContext(UserMaxesContext);
}

export function useUserMaxesUpdate() {
  return useContext(UserMaxesUpdateContext);
}

export function UserMaxesProvider({ children }: UserMaxesProviderProps) {
  const [userMaxesInfo, setUserMaxesInfo] = useState<null | UserMaxes>({
    squat: "",
    bench: "",
    deadlift: "",
  });

  const setUserMaxes = (value: UserMaxes) => {
    setUserMaxesInfo(value);
  };

  return (
    <UserMaxesContext.Provider value={userMaxesInfo}>
      <UserMaxesUpdateContext.Provider value={setUserMaxes}>
        {children}
      </UserMaxesUpdateContext.Provider>
    </UserMaxesContext.Provider>
  );
}
