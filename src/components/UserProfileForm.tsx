import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import axios from "axios";
import { User } from "../contexts/UserContext";

interface UserProfileFormProps {
  user: User;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user }) => {
  const [userInformation, setUserInformation] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    bodyweight: "",
  });

  const { firstName, lastName, email, gender, bodyweight } = userInformation;

  useEffect(() => {
    const { firstName, lastName, email, gender, bodyweight } = user;
    setUserInformation({ firstName, lastName, email, gender, bodyweight });
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue = name === "bodyweight" ? parseInt(value, 10) : value;

    setUserInformation((prevUserInformation) => ({
      ...prevUserInformation,
      [e.target.name]: parsedValue,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserInformation((prevUserInformation) => ({
      ...prevUserInformation,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/user`,
        {
          ...userInformation,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.error;
        console.error(errorMessage);
        toast.error(errorMessage);
      } else {
        console.error((err as Error)?.message);
        toast.error((err as Error)?.message);
      }
    }
  };

  return (
    <div className="form">
      <h2>User Information</h2>
      <form className="u-margin-top-medium" onSubmit={handleSubmit}>
        <label>* REQUIRED FIELDS</label>
        <div className="row">
          <div className="flex-item">
            <label htmlFor="firstName">FIRST NAME *</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex-item">
            <label htmlFor="lastName">LAST NAME *</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="grouping">
            <div className="flex-item">
              <label>GENDER</label>
              <select
                value={gender ? gender : ""}
                onChange={(e) => handleSelectChange("gender", e.target.value)}
              >
                <option hidden value="">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex-item">
              <label htmlFor="bodyweight">WEIGHT</label>
              <input
                type="number"
                name="bodyweight"
                id="bodyweight"
                placeholder="Weight"
                value={bodyweight || ""}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className="flex-item">
            <label htmlFor="email">EMAIL *</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div className="row u-margin-top-medium">
          <Button size={"large"} primary>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
