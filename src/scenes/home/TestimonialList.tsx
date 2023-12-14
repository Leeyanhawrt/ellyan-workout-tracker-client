import { useEffect } from "react";
import TestimonialItem from "./TestimonialItem";
import "/src/assets/stylesheets/components/_Testimonial.scss";
import useAxios from "../../hooks/useAxios";

interface Testimonial {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  review_description: string;
  profile_image_path: string;
}

interface TestimonialListProps {}

const TestimonialList: React.FC<TestimonialListProps> = ({}) => {
  const {
    data: testimonials,
    loading,
    fetchData,
  } = useAxios<Testimonial[]>([], `/testimonial`, `Testimonials`);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderedTestimonials = testimonials.map((testimonial) => {
    return <TestimonialItem key={testimonial.id} {...testimonial} />;
  });

  return <div id="testimonials-container">{renderedTestimonials}</div>;
};

export default TestimonialList;
