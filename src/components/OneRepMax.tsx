import "../assets/stylesheets/components/_OneRepMax.scss";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, ChangeEvent } from "react";

interface OneRepMaxProps {}

interface OneRepMaxData {
  squatMax: number | undefined;
  benchMax: number | undefined;
  deadliftMax: number | undefined;
}

const OneRepMax: React.FC<OneRepMaxProps> = ({}) => {
  const [inputs, setInputs] = useState<OneRepMaxData>({
    squatMax: undefined,
    benchMax: undefined,
    deadliftMax: undefined,
  });

  const { squatMax, benchMax, deadliftMax } = inputs;

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
        `${import.meta.env.VITE_APP_BACKEND}/dashboard/update-orm`,
        {
          squatMax,
          benchMax,
          deadliftMax,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      console.log(response);
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
        <h2>Enter Current Maxes</h2>
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
                id="squatMax"
                name="squatMax"
                placeholder="Squat"
                value={squatMax}
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
                id="benchMax"
                name="benchMax"
                placeholder="Bench Press"
                value={benchMax}
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
                id="deadliftMax"
                name="deadliftMax"
                placeholder="Deadlift"
                value={deadliftMax}
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
