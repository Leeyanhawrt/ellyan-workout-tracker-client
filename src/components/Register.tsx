import Button from "./Button";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/thunks/authActions";

interface RegisterProps {}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = ({}) => {
  const [inputs, setInputs] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = inputs;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    try {
      const response;
    } catch (err) {
      console.log((err as Error)?.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(_e) => handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password "
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <Button>Register</Button>
      </form>
    </>
  );
};

export default Register;
