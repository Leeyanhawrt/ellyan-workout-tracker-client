import "../assets/stylesheets/components/_CarouselItem.scss";

interface Microcycle {
  microcycleNumber: number;
}

interface CarouselItemProps<T> {
  microcycle: boolean;
  item: T;
}

const CarouselItem: React.FC<CarouselItemProps<Microcycle>> = ({
  item,
  microcycle,
}) => {
  if (microcycle) {
    const { microcycleNumber } = item;

    return <div className="carousel-item">{microcycleNumber}</div>;
  }
};

export default CarouselItem;
