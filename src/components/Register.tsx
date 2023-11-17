import Button from "./Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface RegisterProps {
  setAuth: (value: boolean) => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  const { firstName, lastName, email, password } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      const jwtToken = await response.data;
      localStorage.setItem("token", jwtToken.token);
      setAuth(true);
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

  return (
    <>
      <h1 className="u-center-text u-margin-y-small">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleChange(e)}
          className="u-margin-bottom-small"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e)}
          className="u-margin-bottom-small"
        />
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
          placeholder="Password "
          value={password}
          onChange={(e) => handleChange(e)}
          className="u-margin-bottom-small"
        />
        <Button primary>Register</Button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Register;
