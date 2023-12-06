import "/src/assets/stylesheets/components/_Testimonial.scss";
import { useState } from "react";

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
  // DYNAMICALLY RENDER TESTIMONIAL PHOTOS FOR DEVELOPMENT ENVIRONMENT
  const environment = import.meta.env.VITE_APP_ENV;

  const [testimonialImageImport, setTestimonialImageImport] =
    useState<string>(" ");

  const importTestimonialImage = async () => {
    try {
      const module = await import(/* @vite-ignore */ profile_image_path);
      setTestimonialImageImport(module.default);
    } catch (err) {
      console.error(err);
    }
  };

  if (environment === "development") {
    importTestimonialImage();
  }

  let testimonialImage =
    environment === "development" ? testimonialImageImport : profile_image_path;

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
