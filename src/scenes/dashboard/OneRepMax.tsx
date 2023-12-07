import "/src/assets/stylesheets/components/_OneRepMax.scss";
import Button from "../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";
import {
  useUserMaxes,
  useUserMaxesUpdate,
} from "../../contexts/UserMaxesContext";
import { calculateDots } from "../../utils/calculateLifts";
import { useUser } from "../../contexts/UserContext";

interface OneRepMaxProps {}

const OneRepMax: React.FC<OneRepMaxProps> = ({}) => {
  const userMaxes = useUserMaxes();
  const setUserMaxes = useUserMaxesUpdate();

  const user = useUser();

  if (!userMaxes || !user) {
    return <div>Loading...</div>;
  }

  const { gender, bodyweight } = user;

  const { squat, benchpress, deadlift } = userMaxes;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMaxes({
      ...userMaxes,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };

  const handleORMSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/dashboard/orm-records`,
        {
          squat,
          benchpress,
          deadlift,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      toast.success(response.data.message);
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

  const powerliftTotal =
    Number(squat || 0) + Number(benchpress || 0) + Number(deadlift || 0);

  const dotsScores =
    gender && bodyweight
      ? `DOTS: ${calculateDots(gender, bodyweight as number, powerliftTotal)}`
      : ``;

  return (
    <div id="orm-container">
      <h2>Current Maxes</h2>
      <h2>Total: {powerliftTotal}</h2>

      <h2>{dotsScores}</h2>
      <form onSubmit={handleORMSubmit}>
        <div className="sbd-container u-margin-bottom-medium">
          <div className="max-container">
            <img
              src={`${import.meta.env.VITE_PUBLIC_PATH}/icons/kirby-squat.png`}
              alt="Kirby Squat"
            />
            <input
              type="number"
              id="squat"
              name="squat"
              placeholder="Squat"
              value={squat || ""}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="max-container">
            <img
              className="kirby-bench"
              src={`${import.meta.env.VITE_PUBLIC_PATH}/icons/kirby-bench.png`}
              alt="Kirby Bench"
            />
            <input
              type="number"
              id="benchpress"
              name="benchpress"
              placeholder="Bench Press"
              value={benchpress || ""}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="max-container">
            <img
              src={`${
                import.meta.env.VITE_PUBLIC_PATH
              }/icons/kirby-deadlift.png`}
              alt="Kirby Deadlift"
            />
            <input
              type="number"
              id="deadlift"
              name="deadlift"
              placeholder="Deadlift"
              value={deadlift || ""}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <Button primary size={"large"}>
          Update!
        </Button>
      </form>
    </div>
  );
};

export default OneRepMax;
