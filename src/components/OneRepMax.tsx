import "../assets/stylesheets/components/_OneRepMax.scss";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect } from "react";
import { fetchData } from "../utils/api";
import { useUserMaxes, useUserMaxesUpdate } from "../contexts/UserMaxesContext";

interface OneRepMaxProps {}

interface UserMaxes {
  squat: number | undefined;
  bench: number | undefined;
  deadlift: number | undefined;
}

const OneRepMax: React.FC<OneRepMaxProps> = ({}) => {
  const userMaxes = useUserMaxes();
  const setUserMaxes = useUserMaxesUpdate();

  if (!userMaxes) {
    return <div>Loading...</div>;
  }

  const { squat, bench, deadlift } = userMaxes;

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(
          `/dashboard/orm-records`,
          "One Rep Maxes",
          true
        );

        const data: UserMaxes[] = response.data;
        const { squat, bench, deadlift } = data[0];
        setUserMaxes({ squat, bench, deadlift });
      } catch (err) {
        console.error("Error Fetching One Rep Maxes:", err);
      }
    };
    setData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMaxes({
      ...userMaxes,
      [e.target.name]: parseInt(e.target.value, 10) || undefined,
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
          bench,
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

  return (
    <div className="content-container u-margin-top-small">
      <div id="orm-container">
        <h2>Current Maxes:</h2>
        <h2>
          Total:{" "}
          {Number(squat || 0) + Number(bench || 0) + Number(deadlift || 0)}
        </h2>
        <form onSubmit={handleORMSubmit}>
          <div className="sbd-container u-margin-bottom-medium">
            <div className="max-container">
              <img
                src={`${
                  import.meta.env.VITE_PUBLIC_PATH
                }/icons/kirby-squat.png`}
                alt="Kirby Squat"
              />
              <input
                type="number"
                id="squat"
                name="squat"
                placeholder="Squat"
                defaultValue={squat}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="max-container">
              <img
                className="kirby-bench"
                src={`${
                  import.meta.env.VITE_PUBLIC_PATH
                }/icons/kirby-bench.png`}
                alt="Kirby Bench"
              />
              <input
                type="number"
                id="bench"
                name="bench"
                placeholder="Bench Press"
                defaultValue={bench}
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
                defaultValue={deadlift}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <Button primary rectangle size={"large"}>
            Update!
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OneRepMax;
