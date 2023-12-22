import "/src/assets/stylesheets/layout/_Nav.scss";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import className from "classnames";
import { useLocation } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { IoIosMenu } from "react-icons/io";
import { useModal } from "../../contexts/ModalContext";
import MobileMenu from "./MobileMenu";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const [scrolled, setScrolled] = useState<number>(0);

  const location = useLocation();
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();
  const { showMobileModal, setMobileModal } = useModal();

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

  const toggleMobileMenu = () => {
    setMobileModal(!showMobileModal);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    window.location.reload();
  };

  const classes = className({
    "nav-transparent": scrolled < 200 && location.pathname === "/",
    "nav-overlap": location.pathname === "/",
    "nav-hidden-mobile": scrolled > 1 && location.pathname !== "/",
  });

  return (
    <nav id="navbar" className={`${classes}`}>
      <Link to="/" className="app-title">
        <img
          src={`${import.meta.env.VITE_PUBLIC_PATH}/icons/kirby-nav.png`}
          alt="Kirby Weightlifting"
        />
        <p>EllyanTracker</p>
      </Link>
      <div className="button-container" id="non-mobile-nav">
        {authStatus ? (
          <>
            {location.pathname !== "/dashboard" && (
              <Button
                to="/dashboard/workout_program"
                size={"small"}
                rectangle
                primary
              >
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
      <div id="mobile-nav">
        <IoIosMenu onClick={toggleMobileMenu} className="menu-button" />
        {showMobileModal && <MobileMenu />}
      </div>
    </nav>
  );
};

export default Nav;
