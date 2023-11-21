import "../assets/stylesheets/components/_Modal.scss";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.querySelector(".modal-container")!
  );
};

export default Modal;
