import { ChangeEvent, useState, useEffect } from "react";
import Button from "./Button";

interface UserProfileFormProps {
  user: UserInformation;
}

interface UserInformation {
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  bodyweight?: number | undefined;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user }) => {
  const [userInformation, setUserInformation] = useState<UserInformation>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    bodyweight: undefined,
  });

  const { firstName, lastName, email, gender, bodyweight } = userInformation;

  useEffect(() => {
    const { firstName, lastName, email, gender, bodyweight } = user;
    setUserInformation({ firstName, lastName, email, gender, bodyweight });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserInformation({ ...userInformation, [name]: value });
  };

  // const handleSubmit;

  return (
    <div className="content-container">
      <div className="form">
        <h2>User Information</h2>
        <form className="u-margin-top-medium">
          <label>* REQUIRED FIELDS</label>
          <div className="row">
            <div className="flex-item">
              <label htmlFor="firstName">FIRST NAME *</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                defaultValue={firstName}
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
                defaultValue={lastName}
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
                  defaultValue={bodyweight}
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
                defaultValue={email}
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
    </div>
  );
};

export default UserProfileForm;
