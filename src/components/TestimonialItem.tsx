import "../assets/stylesheets/components/_TestimonialItem.scss";

interface TestimonialItemProps {
  first_name: string;
  last_name: string;
  title: string;
  review_description: string;
  profile_image_path: string;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  first_name,
  last_name,
  title,
  review_description,
  profile_image_path,
}) => {
  return (
    <div className="testimonial u-margin-bottom-medium">
      <div className="testimonial-image">
        <img
          src={profile_image_path}
          alt={`Testimonial ${first_name} ${last_name}`}
        />
        <p className="testimonial-author">{`${first_name} ${last_name}`}</p>
      </div>
      <div className="testimonial-text">
        <h3 className="u-margin-bottom-tiny">{title}</h3>
        <p>{review_description}</p>
      </div>
    </div>
  );
};

export default TestimonialItem;
