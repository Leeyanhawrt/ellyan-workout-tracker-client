import { useParams } from "react-router";
import { useEffect } from "react";
import { User } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import Button from "../../components/Button";

type UserDetailProps = {};

const UserDetail: React.FC<UserDetailProps> = ({}) => {
  const { userId } = useParams();

  const {
    data: user,
    loading,
    fetchData,
  } = useAxios<Partial<User>>({}, `/admin/user/${userId}`, "User Data", true);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <form>
        <label>* REQUIRED FIELDS</label>
        <div className="row">
          <div className="flex-item">
            <label htmlFor="firstName">FIRST NAME *</label>
            <input
              disabled
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={user.firstName}
            />
          </div>
          <div className="flex-item">
            <label htmlFor="lastName">LAST NAME *</label>
            <input
              disabled
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={user.lastName}
            />
          </div>
        </div>

        <div className="row">
          <div className="grouping">
            <div className="flex-item">
              <label>GENDER</label>
              <select value={""}>
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
                value={""}
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
              value={""}
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
export default UserDetail;
