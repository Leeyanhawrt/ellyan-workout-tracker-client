import "../assets/stylesheets/components/_CarouselItem.scss";
import DailyWorkout from "./DailyWorkout";

interface Microcycle {
  microcycleNumber: number;
  id: number;
}

interface CarouselItemProps<T> {
  microcycle?: boolean;
  item: T;
}

const CarouselItem: React.FC<CarouselItemProps<Microcycle>> = ({
  microcycle,
  item,
}) => {
  if (microcycle) {
    return (
      <div className="microcycle-item">
        <DailyWorkout microcycleId={item.id} />
      </div>
    );
  }

  return <div className="carousel-item"></div>;
};

export default CarouselItem;
