import "../assets/stylesheets/layout/_Nav.scss";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import className from "classnames";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const [scrolled, setScrolled] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const classes = className("nav", {
    "nav-transparent": scrolled < 200,
  });

  return (
    <nav id="navbar" className={classes}>
      <Link to="/" className="app-title">
        <img
          src={`${
            import.meta.env.VITE_PUBLIC_PATH
          }/icons/kirby-weightlifting.png`}
          alt="Kirby Weightlifting"
        />
        <p>EllyanTracker</p>
      </Link>
      <div className="button-container">
        <Button to="/login" size={"small"} primary>
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Nav;