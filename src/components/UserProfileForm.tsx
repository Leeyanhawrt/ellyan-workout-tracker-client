import "../assets/stylesheets/components/_UserProfileForm.scss";
import { ChangeEvent, useState } from "react";

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

  const { bodyweight } = userInformation;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserInformation({ ...userInformation, [name]: value });
  };

  return (
    <div className="content-container">
      <div className="user-profile-form">
        <h2>User Information</h2>
        <form>
          <div className="row">
            <div>
              <label>GENDER</label>
              <select
                defaultValue=""
                onChange={(e) => handleSelectChange("gender", e.target.value)}
              >
                <option hidden value="">
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
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
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
