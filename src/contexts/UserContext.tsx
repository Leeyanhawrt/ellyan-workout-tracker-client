import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";

interface UserProviderProps {
  children: ReactNode;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  bodyweight?: number | string;
  workoutProgramId: number;
  roles?: string[];
  workoutProgramName?: string;
  roundDown: boolean;
};

type UserUpdateContextType = (value: User) => void;

const UserContext = createContext<null | User>(null);
const UserUpdateContext = createContext<UserUpdateContextType>(() => {});

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<null | User>(null);

  const setUser = (value: User) => {
    setUserInfo(value);
  };

  return (
    <UserContext.Provider value={userInfo}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
