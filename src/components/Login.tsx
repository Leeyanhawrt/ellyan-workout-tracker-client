import Button from "./Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";

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
    <>
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
        <Button size={"medium"}>Log In</Button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
