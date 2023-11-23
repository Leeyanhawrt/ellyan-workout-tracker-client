import "../assets/stylesheets/components/_OneRepMax.scss";

interface OneRepMaxProps {}

const OneRepMax: React.FC<OneRepMaxProps> = ({}) => {
  return (
    <div className="content-container u-margin-top-small">
      <div id="orm-container">
        <h2>Enter Current Maxes</h2>
        <form>
          <div className="max-container">
            <img
              src={`${import.meta.env.VITE_PUBLIC_PATH}/icons/kirby-squat.png`}
              alt="Kirby Squat"
            />
            <input type="number" id="squat" name="squat" placeholder="Squat" />
          </div>
          <div className="max-container">
            <img
              src={`${import.meta.env.VITE_PUBLIC_PATH}/icons/kirby-bench.png`}
              alt="Kirby Bench"
            />
            <input
              type="number"
              id="bench"
              name="bench"
              placeholder="Bench Press"
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
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OneRepMax;
