import { useEffect, useState } from "react";
import axios from "axios";
import TestimonialItem from "./TestimonialItem";
import "../assets/stylesheets/components/_TestimonialList.scss";

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

  const fetchTestimonials = async () => {
    let response = await axios.get(
      `${process.env.ELLYAN_APP_BACKEND}/testimonial`
    );
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTestimonials();
        const data: TestimonalInterface[] = response.data;
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchData();
  }, []);

  const renderedTestimonials = testimonials.map((testimonial) => {
    return <TestimonialItem key={testimonial.id} {...testimonial} />;
  });

  return <div className="testimonials-container">{renderedTestimonials}</div>;
};

export default TestimonialList;
