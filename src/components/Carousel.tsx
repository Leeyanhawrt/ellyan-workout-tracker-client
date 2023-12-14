import "../assets/stylesheets/components/_Carousel.scss";
import CarouselItem from "./CarouselItem";
import { useState, useEffect } from "react";
import DailyWorkout from "../scenes/dashboard/DailyWorkout";
import { IoIosAdd } from "react-icons/io";
import { postData } from "../utils/api";

interface CarouselProps<T> {
  items: T[];
  dailyWorkout?: boolean;
  resetCarousel?: boolean;
  revertCarouselReset?: () => void;
  edittable?: boolean;
  handleAdd: (newDailyWorkout: DailyWorkout) => void;
  microcycleId: number;
}

const Carousel: React.FC<CarouselProps<DailyWorkout>> = ({
  items,
  dailyWorkout,
  resetCarousel,
  revertCarouselReset,
  edittable,
  handleAdd,
  microcycleId,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (resetCarousel) {
      setActiveIndex(0);
      if (revertCarouselReset) {
        revertCarouselReset();
      }
    }
  }, [resetCarousel]);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };

  const addDailyWorkout = async () => {
    const response = await postData(
      `/admin/workout_programs/daily_workout`,
      { dayNumber: items.length, microcycleId },
      true
    );
    handleAdd(response?.data.dailyWorkout);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              item={item}
              dailyWorkout={dailyWorkout}
              edittable={edittable}
            />
          );
        })}
      </div>

      <div className="carousel-buttons">
        <button
          onClick={() => updateIndex(activeIndex - 1)}
          className="button-arrow"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="carousel-indicator">
          {items.map((_item, index) => {
            return (
              <button
                key={index}
                onClick={() => updateIndex(index)}
                className="indicator-buttons"
              >
                <span
                  className={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  radio_button_checked
                </span>
              </button>
            );
          })}
          {edittable && (
            <button
              onClick={addDailyWorkout}
              className="carousel-item-add indicator-buttons"
            >
              <span>
                <IoIosAdd />
              </span>
            </button>
          )}
        </div>
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          className="button-arrow"
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
