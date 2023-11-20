import Button from "./Button";
import axios from "axios";
import "../assets/stylesheets/components/_RegisterModal.scss";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

interface RegisterProps {
  setAuth: (value: boolean) => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  const { firstName, lastName, email, password, passwordConfirm } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords don't match");
      return;
    }

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
    <div className="content-container">
      <div id="register-modal">
        <form onSubmit={handleSubmit}>
          <h1 className="u-center-text u-margin-bottom-small">Registration</h1>
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="email">Email Address</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="u-margin-bottom-small">
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="passwordConfirm">Confirm Password</label>
          </div>
          <Button tertiary>Register</Button>
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
        <IoClose className="close-modal" />
      </div>
    </div>
  );
};

export default Register;
