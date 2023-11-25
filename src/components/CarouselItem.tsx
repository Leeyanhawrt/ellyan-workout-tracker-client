import "../assets/stylesheets/components/_CarouselItem.scss";

interface Item {
  description: string;
  title: string;
}

interface CarouselItemProps {
  item: Item;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <div className="carousel-item">
      {item.title}
      {item.description}
    </div>
  );
};

export default CarouselItem;
