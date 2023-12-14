import "/src/assets/stylesheets/components/_MobileMenu.scss";
import MobileMenuItem from "./MobileMenuItem";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const user = useUser();
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();

  const isAdmin = user?.roles?.includes("admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    window.location.reload();
  };

  let menuItems = [
    { to: `/dashboard/workout_program`, resource: `Workout Program` },
    { to: `/dashboard/edit_record`, resource: `Personal Record` },
    { to: `/dashboard/preferences`, resource: `Profile` },
  ];

  const adminItems = [
    { to: `/admin/workout_programs`, resource: `Admin Workout Programs` },
    { to: `/admin/manage_users`, resource: `Admin Manage Users` },
  ];

  if (isAdmin) {
    menuItems = menuItems.concat(adminItems);
  }

  return (
    <ul id="mobile-menu">
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
