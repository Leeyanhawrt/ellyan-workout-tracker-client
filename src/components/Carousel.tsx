import "../assets/stylesheets/components/_Carousel.scss";
import CarouselItem from "./CarouselItem";
import { useState } from "react";
import DailyWorkout from "./DailyWorkout";

interface CarouselProps<T> {
  items: T[];
  dailyWorkout?: boolean;
}

const Carousel: React.FC<CarouselProps<DailyWorkout>> = ({
  items,
  dailyWorkout,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
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
