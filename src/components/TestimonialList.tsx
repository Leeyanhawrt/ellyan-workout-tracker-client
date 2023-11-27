import { useEffect, useState } from "react";
import TestimonialItem from "./TestimonialItem";
import "../assets/stylesheets/components/_TestimonialList.scss";
import { fetchData } from "../utils/api";

interface TestimonalInterface {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  review_description: string;
  profile_image_path: string;
}

interface TestimonialListProps {}

const TestimonialList: React.FC<TestimonialListProps> = ({}) => {
  const [testimonials, setTestimonials] = useState<TestimonalInterface[]>([]);

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await fetchData(`/testimonial`, "Testimonials");

        const data: TestimonalInterface[] = response.data;
        setTestimonials(data);
      } catch (err) {
        console.error("Error Fetching Testimonials:", err);
      }
    };

    setData();
  }, []);

  const renderedTestimonials = testimonials.map((testimonial) => {
    return <TestimonialItem key={testimonial.id} {...testimonial} />;
  });

  return <div className="testimonials-container">{renderedTestimonials}</div>;
};

export default TestimonialList;
