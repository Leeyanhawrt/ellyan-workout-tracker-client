import "../assets/stylesheets/components/_CarouselItem.scss";
import ExerciseList from "./ExerciseList";
import DailyWorkout from "./DailyWorkout";

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
