import "../assets/stylesheets/components/_OneRepMax.scss";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, ChangeEvent, useEffect } from "react";
import { fetchData } from "../utils/api";

interface OneRepMaxProps {}

interface OneRepMaxData {
  squatRecord: number | undefined;
  benchRecord: number | undefined;
  deadliftRecord: number | undefined;
}

const OneRepMax: React.FC<OneRepMaxProps> = ({}) => {
  const [inputs, setInputs] = useState<OneRepMaxData>({
    squatRecord: undefined,
    benchRecord: undefined,
    deadliftRecord: undefined,
  });

  const { squatRecord, benchRecord, deadliftRecord } = inputs;

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(
          `/dashboard/orm-records`,
          "One Rep Maxes",
          true
        );

        const data: OneRepMaxData[] = response.data;
        const { squatRecord, benchRecord, deadliftRecord } = data[0];
        setInputs({ squatRecord, benchRecord, deadliftRecord });
      } catch (err) {
        console.error("Error Fetching One Rep Maxes:", err);
      }
    };
    setData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
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
          squatRecord,
          benchRecord,
          deadliftRecord,
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
        <h2>Update Current Maxes:</h2>
        <h2>
          Total:{" "}
          {Number(squatRecord || 0) +
            Number(benchRecord || 0) +
            Number(deadliftRecord || 0)}
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
                id="squatRecord"
                name="squatRecord"
                placeholder="Squat"
                defaultValue={squatRecord}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="max-container">
              <img
                src={`${
                  import.meta.env.VITE_PUBLIC_PATH
                }/icons/kirby-bench.png`}
                alt="Kirby Bench"
              />
              <input
                type="number"
                id="benchRecord"
                name="benchRecord"
                placeholder="Bench Press"
                defaultValue={benchRecord}
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
                id="deadliftRecord"
                name="deadliftRecord"
                placeholder="Deadlift"
                defaultValue={deadliftRecord}
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
