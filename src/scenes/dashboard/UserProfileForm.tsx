import { ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import axios from "axios";
import { useUser, useUserUpdate } from "../../contexts/UserContext";

interface UserProfileFormProps {}

const UserProfileForm: React.FC<UserProfileFormProps> = ({}) => {
  const user = useUser();
  const setUser = useUserUpdate();

  if (!user) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, email, gender, bodyweight, roundDown } = user;

  useEffect(() => {
    setUser({
      ...user,
      firstName,
      lastName,
      email,
      gender,
      bodyweight,
      roundDown,
    });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue = name === "bodyweight" ? parseInt(value, 10) : value;

    setUser({
      ...user,
      [e.target.name]: parsedValue,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      [name]: checked,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/user`,
        {
          ...user,
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
    <div className="form-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
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
                value={gender || ""}
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
                min="0"
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
        <div className="row">
          <div className="flex-item checkbox single">
            <label>
              <input
                type="checkbox"
                checked={roundDown ?? false}
                onChange={handleCheckboxChange}
                name="roundDown"
              />
              Round Down Lifts
            </label>
          </div>
        </div>
        <div className="row">
          <Button size={"large"} primary>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
