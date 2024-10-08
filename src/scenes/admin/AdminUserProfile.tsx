import { useParams } from "react-router";
import { useEffect, useState, ChangeEvent } from "react";
import { User } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import Button from "../../components/Button";
import UserWorkoutForm from "./UserWorkoutForm";
import { postData } from "../../utils/api";

type AdminUserProfileProps = {};

type UserDetail = {
  workoutProgramId: number | undefined;
  userId: number | undefined;
  roundDown: boolean | undefined;
};

const AdminUserProfile: React.FC<AdminUserProfileProps> = ({}) => {
  const { userId } = useParams();

  const {
    data: user,
    loading,
    fetchData,
  } = useAxios<Partial<User>>({}, `/admin/users/${userId}`, "User Data", true);

  const [inputs, setInputs] = useState<UserDetail>({
    userId: userId !== undefined ? parseInt(userId, 10) : undefined,
    workoutProgramId: undefined,
    roundDown: undefined,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setInputs({
      ...inputs,
      workoutProgramId: user.workoutProgramId,
      roundDown: user.roundDown,
    });
  }, [user]);

  const handleSelectChange = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: parseInt(value, 10),
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: checked,
    });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    postData<UserDetail>(`/admin/users`, { ...inputs }, true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { workoutProgramId, roundDown } = inputs;

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <form onSubmit={handleFormSubmit}>
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
              <select value={user.gender} disabled>
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
                value={user.bodyweight}
                min="0"
                disabled
              />
            </div>
          </div>
          <div className="flex-item">
            <label htmlFor="email">EMAIL *</label>
            <input
              type="text"
              name="email"
              id="email"
              disabled
              placeholder="Email"
              value={user.email}
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
        <UserWorkoutForm
          workoutProgramId={workoutProgramId}
          handleSelectChange={handleSelectChange}
        />
        <div className="row">
          <Button size={"large"} primary>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AdminUserProfile;
