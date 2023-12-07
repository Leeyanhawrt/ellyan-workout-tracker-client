import Button from "../../components/Button";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import "/src/assets/stylesheets/components/_Login.scss";
import { useAuthUpdate } from "../../contexts/AuthContext";
import { useUserUpdate } from "../../contexts/UserContext";

interface AdminLoginProps {}

interface LoginData {
  email: string;
  password: string;
}

const AdminLogin: React.FC<AdminLoginProps> = () => {
  const setAuth = useAuthUpdate();
  const setUser = useUserUpdate();

  const [inputs, setInputs] = useState<LoginData>({
    email: "",
    password: "",
  });

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

      const data = await response.data;

      if (data) {
        localStorage.setItem("token", data.token);
        setAuth(true);
        setUser(data.user);
        toast.success("Admin Login Successful!");
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
      <h1>Admin Login</h1>
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
    </div>
  );
};

export default AdminLogin;
