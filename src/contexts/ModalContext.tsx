import { ReactNode, createContext, useContext, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextType {
  showRegisterModal: boolean;
  showMobileModal: boolean;
  setRegisterModal: (value: boolean) => void;
  setMobileModal: (value: boolean) => void;
}

const defaultValue: ModalContextType = {
  showRegisterModal: false,
  showMobileModal: false,
  setRegisterModal: () => {},
  setMobileModal: () => {},
};

const ModalContext = createContext(defaultValue);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);

  const setRegisterModal = (value: boolean) => {
    setShowRegisterModal(value);
  };

  const setMobileModal = (value: boolean) => {
    setShowMobileModal(value);
  };

  const contextValue: ModalContextType = {
    showRegisterModal,
    showMobileModal,
    setRegisterModal,
    setMobileModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
