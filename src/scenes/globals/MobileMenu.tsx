import "/src/assets/stylesheets/components/_MobileMenu.scss";
import MobileMenuItem from "./MobileMenuItem";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.success(`Successfully Logged Out!`);
  };

  const menuItems = [
    { to: `/dashboard/workout_program`, resource: `Workout Program` },
    { to: `/dashboard/edit_record`, resource: `Personal Record` },
    { to: `/dashboard/preferences`, resource: `Profile` },
  ];

  return (
    <ul className="mobile-menu">
      {menuItems.map((item) => {
        return <MobileMenuItem key={item.resource} {...item} />;
      })}
      {authStatus ? (
        <>
          <div className="mobile-menu-item">
            <Link to="/" onClick={handleLogout}>
              <li className="mobile-menu-item">Logout</li>
            </Link>
          </div>
        </>
      ) : (
        <div className="mobile-menu-item">
          <Link to={`/login`}>
            <li className="mobile-menu-item">Login</li>
          </Link>
        </div>
      )}
    </ul>
  );
};

export default MobileMenu;
