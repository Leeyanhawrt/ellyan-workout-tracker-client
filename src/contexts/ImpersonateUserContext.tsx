import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";

interface ImpersonateUserProviderProps {
  children: ReactNode;
}

export type ImpersonateUser = {
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

type ImpersonateUserUpdateContextType = (value: ImpersonateUser) => void;

const ImpersonateUserContext = createContext<null | ImpersonateUser>(null);
const ImpersonateUserUpdateContext =
  createContext<ImpersonateUserUpdateContextType>(() => {});

export function useImpersonateUser() {
  return useContext(ImpersonateUserContext);
}

export function useImpersonateUserUpdate() {
  return useContext(ImpersonateUserUpdateContext);
}

export function ImpersonateUserProvider({
  children,
}: ImpersonateUserProviderProps) {
  const [userInfo, setImpersonateUserInfo] = useState<null | ImpersonateUser>(
    null
  );

  const setImpersonateUser = (value: ImpersonateUser) => {
    setImpersonateUserInfo(value);
  };

  return (
    <ImpersonateUserContext.Provider value={userInfo}>
      <ImpersonateUserUpdateContext.Provider value={setImpersonateUser}>
        {children}
      </ImpersonateUserUpdateContext.Provider>
    </ImpersonateUserContext.Provider>
  );
}
