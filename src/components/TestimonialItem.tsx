import { useState } from "react";
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
  const [testimonialImage, setTestimonialImage] = useState<string>(" ");

  const importTestimonialImage = async () => {
    try {
      const module = await import(profile_image_path);
      setTestimonialImage(module.default);
    } catch (err) {
      console.error(err);
    }
  };

  importTestimonialImage();
  {
    console.log(profile_image_path, testimonialImage);
  }

  return (
    <div className="testimonial u-margin-bottom-medium">
      <div className="testimonial-image">
        <img
          src={testimonialImage}
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
