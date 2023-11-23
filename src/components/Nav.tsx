import "../assets/stylesheets/layout/_Nav.scss";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import className from "classnames";
import { useLocation } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../contexts/AuthContext";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const [scrolled, setScrolled] = useState<number>(0);

  const location = useLocation();
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const classes = className({
    "nav-transparent": scrolled < 200 && location.pathname === "/",
    "nav-overlap": location.pathname === "/",
  });

  return (
    <nav id="navbar" className={classes}>
      <Link to="/" className="app-title">
        <img
          src={`${import.meta.env.VITE_PUBLIC_PATH}/icons/kirby-deadlift.png`}
          alt="Kirby Weightlifting"
        />
        <p>EllyanTracker</p>
      </Link>
      <div className="button-container">
        {authStatus ? (
          <>
            {location.pathname !== "/dashboard" && (
              <Button to="/dashboard" size={"small"} rectangle primary>
                Dashboard
              </Button>
            )}
            <Button
              size={"small"}
              rectangle
              primary
              outline
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button to="/login" size={"small"} rectangle primary>
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
