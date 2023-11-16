import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";

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
      localStorage.setItem("token", jwtToken.token);

      setAuth(true);
    } catch (err) {
      console.log((err as Error)?.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleChange(e)}
          className="form-control u-margin-bottom-small"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e)}
          className="form-control u-margin-bottom-small"
        />
        <Button onClick={() => setAuth(true)}>Log In</Button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
