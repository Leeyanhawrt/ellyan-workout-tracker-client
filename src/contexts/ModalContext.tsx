import { ReactNode, createContext, useContext, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

type ModalUpdateContextType = (value: boolean) => void;

const ModalContext = createContext<boolean>(false);
const ModalUpdateContext = createContext<ModalUpdateContextType>(() => {});

export function useModal() {
  return useContext(ModalContext);
}

export function useModalUpdate() {
  return useContext(ModalUpdateContext);
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  const setModalStatus = (value: boolean) => {
    setShowRegisterModal(value);
  };

  return (
    <ModalContext.Provider value={showRegisterModal}>
      <ModalUpdateContext.Provider value={setModalStatus}>
        {children}
      </ModalUpdateContext.Provider>
    </ModalContext.Provider>
  );
}
