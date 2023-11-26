import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";

interface LoadingProviderProps {
  children: ReactNode;
}

type LoadingUpdateContextType = (value: boolean) => void;

const LoadingContext = createContext<boolean>(false);
const LoadingUpdateContext = createContext<LoadingUpdateContextType>(() => {});

export function useLoading() {
  return useContext(LoadingContext);
}

export function useLoadingUpdate() {
  return useContext(LoadingUpdateContext);
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <LoadingContext.Provider value={isLoading}>
      <LoadingUpdateContext.Provider value={setLoading}>
        {children}
      </LoadingUpdateContext.Provider>
    </LoadingContext.Provider>
  );
}
