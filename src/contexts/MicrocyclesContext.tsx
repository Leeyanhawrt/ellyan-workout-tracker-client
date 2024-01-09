import { useContext, useState, ReactNode } from "react";
import { createContext } from "react";
import { Microcycle } from "../scenes/dashboard/Microcycle";

interface MicrocyclesProviderProps {
  children: ReactNode;
}

type MicrocyclesContextType = {
  microcycles: Microcycle[];
  activeMicrocycle: number;
  setMicrocycles: (value: Microcycle[]) => void;
  setActiveMicrocycle: (value: number) => void;
  appendMicrocycle: (value: Microcycle) => void;
};

const defaultValue: MicrocyclesContextType = {
  microcycles: [],
  activeMicrocycle: 0,
  setMicrocycles: () => {},
  setActiveMicrocycle: () => {},
  appendMicrocycle: () => {},
};

const MicrocyclesContext = createContext(defaultValue);

export function useMicrocycles() {
  return useContext(MicrocyclesContext);
}

export function MicrocyclesProvider({ children }: MicrocyclesProviderProps) {
  const [microcycles, setMicrocyclesState] = useState<Microcycle[]>([]);
  const [activeMicrocycle, setActiveMicrocycleState] = useState<number>(0);

  const setMicrocycles = (value: Microcycle[]) => {
    setMicrocyclesState(value);
  };

  const appendMicrocycle = (value: Microcycle) => {
    setMicrocyclesState((prev) => [...prev, value]);
  };

  const setActiveMicrocycle = (value: number) => {
    setActiveMicrocycleState(value);
  };

  const contextValue: MicrocyclesContextType = {
    microcycles,
    activeMicrocycle,
    setMicrocycles,
    setActiveMicrocycle,
    appendMicrocycle,
  };

  return (
    <MicrocyclesContext.Provider value={contextValue}>
      {children}
    </MicrocyclesContext.Provider>
  );
}
