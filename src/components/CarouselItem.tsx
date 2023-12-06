import "/src/assets/stylesheets/components/_Carousel.scss";
import ExerciseList from "../scenes/dashboard/ExerciseList";
import DailyWorkout from "../scenes/dashboard/DailyWorkout";

interface CarouselItemProps<T> {
  dailyWorkout?: boolean;
  item: T;
}

const CarouselItem: React.FC<CarouselItemProps<DailyWorkout>> = ({
  dailyWorkout,
  item,
}) => {
  if (dailyWorkout) {
    return (
      <div className="daily-workout-list carousel-item">
        <ExerciseList dailyWorkout={item} />
      </div>
    );
  }

  return <div className="carousel-item"></div>;
};

export default CarouselItem;
