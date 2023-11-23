import Button from "./Button";
import axios from "axios";
import Modal from "./Modal";
import Register from "./Register";
import { useState, ChangeEvent } from "react";
import { useModal, useModalUpdate } from "../contexts/ModalContext";
import { toast } from "react-toastify";
import "../assets/stylesheets/components/_Login.scss";

interface LoginProps {
  setAuth: (value: boolean) => void;
}

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState<LoginData>({
    email: "",
    password: "",
  });

  const modalStatus = useModal();
  const setModal = useModalUpdate();

  const openRegisterModal = () => {
    setModal(true);
  };

  const closeRegisterModal = () => {
    setModal(false);
  };

  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  const { email, password } = inputs;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });

      const jwtToken = await response.data;

      if (jwtToken) {
        localStorage.setItem("token", jwtToken.token);
        setAuth(true);
        toast.success("Login Successful!");
      } else {
        setAuth(false);
        toast.error("Couldn't fetch JWT token");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data;
        console.error(errorMessage);
        toast.error(errorMessage);
      } else {
        console.error((err as Error)?.message);
        toast.error((err as Error)?.message);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e)}
          className="u-margin-bottom-small"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange(e)}
          className="u-margin-bottom-small"
        />
        <Button size={"medium"} primary>
          Login
        </Button>
      </form>
      <p>
        Don't have an account? <a onClick={openRegisterModal}>Register</a>
      </p>
      {modalStatus && (
        <Modal>
          <Register setAuth={setAuth} closeRegisterModal={closeRegisterModal} />
        </Modal>
      )}
    </div>
  );
};

export default Login;
