import "/src/assets/stylesheets/components/_Carousel.scss";
import ExerciseList from "../scenes/dashboard/ExerciseList";
import { DailyWorkout } from "../scenes/dashboard/DailyWorkout";

interface CarouselItemProps<T> {
  dailyWorkout?: boolean;
  item: T;
  edittable?: boolean;
}

const CarouselItem: React.FC<CarouselItemProps<DailyWorkout>> = ({
  dailyWorkout,
  item,
  edittable,
}) => {
  if (dailyWorkout) {
    return (
      <div className="daily-workout-list carousel-item">
        <ExerciseList dailyWorkout={item} edittable={edittable} />
      </div>
    );
  }

  return <div className="carousel-item"></div>;
};

export default CarouselItem;
