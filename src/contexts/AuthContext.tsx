import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthUpdateContextType = (value: boolean) => void;

const AuthContext = createContext<boolean>(false);
const AuthUpdateContext = createContext<AuthUpdateContextType>(() => {});

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <AuthUpdateContext.Provider value={setAuth}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
