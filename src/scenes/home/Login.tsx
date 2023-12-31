import Button from "../../components/Button";
import axios from "axios";
import Modal from "../../components/Modal";
import Register from "./Register";
import { useState, ChangeEvent } from "react";
import { useModal } from "../../contexts/ModalContext";
import { toast } from "react-toastify";
import "/src/assets/stylesheets/components/_Login.scss";
import { useAuthUpdate } from "../../contexts/AuthContext";

interface LoginProps {}

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const setAuth = useAuthUpdate();

  const [inputs, setInputs] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { setRegisterModal, showRegisterModal } = useModal();

  const openRegisterModal = () => {
    setRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setRegisterModal(false);
  };

  const { email, password } = inputs;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/auth/login`,
        {
          email,
          password,
        }
      );

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
        let errorMessage;
        if (err.response?.status === 401) {
          errorMessage = `Incorrect Email or Password`;
        } else {
          errorMessage = `${err.message} Check Server Status`;
        }
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
          placeholder="Email Address"
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
      {showRegisterModal && (
        <Modal>
          <Register closeRegisterModal={closeRegisterModal} />
        </Modal>
      )}
    </div>
  );
};

export default Login;
