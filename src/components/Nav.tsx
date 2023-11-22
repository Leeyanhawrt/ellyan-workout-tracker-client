import "../assets/stylesheets/layout/_Nav.scss";
import Button from "./Button";
import { Link } from "react-router-dom";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  return (
    <nav id="navbar">
      <Link to="/" className="app-title">
        <img src="/public/icons/kirby-weightlifting.png" />
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
