import "../assets/stylesheets/components/_Modal.scss";
import ReactDOM from "react-dom";
import { ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.querySelector(".modal-container")!
  );
};

export default Modal;
