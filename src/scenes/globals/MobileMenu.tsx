import "/src/assets/stylesheets/components/_MobileMenu.scss";
import MobileMenuItem from "./MobileMenuItem";
import { useState, useEffect } from "react";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const MENU_TYPES = {
    DASHBOARD: 1,
    ADMIN: 2,
  };

  const user = useUser();
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();
  const { setMobileModal, showMobileModal } = useModal();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const isAdmin = user?.roles?.includes("admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMobileModal(false);
    setAuth(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleDocumentPress = (e: MouseEvent | TouchEvent) => {
      if (showMobileModal && e.target) {
        const targetElement = e.target as Element;
        if (
          !targetElement.closest("#mobile-menu") &&
          !targetElement.classList.contains("menu-button")
        ) {
          setMobileModal(false);
        }
      }
    };

    document.addEventListener("click", handleDocumentPress);
    document.addEventListener("touchstart", handleDocumentPress);

    return () => {
      document.removeEventListener("click", handleDocumentPress);
      document.removeEventListener("touchstart", handleDocumentPress);
    };
  }, [showMobileModal]);

  let dashboardItems = [
    { to: `/dashboard/workout_program`, resource: `Workout Program` },
    { to: `/dashboard/edit_record`, resource: `Personal Record` },
    { to: `/dashboard/preferences`, resource: `Profile` },
  ];

  const adminItems = [
    { to: `/admin/workout_programs`, resource: `Manage Workout Programs` },
    { to: `/admin/manage_users`, resource: `Manage Users` },
  ];

  return (
    <ul id="mobile-menu">
      {authStatus && (
        <ul
          className={`dashboard-list ${
            activeMenu === MENU_TYPES.DASHBOARD ? "active" : ""
          }`}
          onClick={() => setActiveMenu(1)}
        >
          <p>Dashboard</p>
          <div className="menu-list">
            {dashboardItems.map((item) => {
              return <MobileMenuItem key={item.resource} {...item} />;
            })}
          </div>
        </ul>
      )}
      {isAdmin && (
        <ul
          className={`admin-list ${
            activeMenu === MENU_TYPES.ADMIN ? "active" : ""
          }`}
          onClick={() => setActiveMenu(2)}
        >
          <p>Admin</p>
          <div className="menu-list">
            {adminItems.map((item) => {
              return <MobileMenuItem key={item.resource} {...item} />;
            })}
          </div>
        </ul>
      )}
      {authStatus ? (
        <>
          <div className="mobile-menu-static">
            <Link to="/" onClick={handleLogout}>
              <li>Logout</li>
            </Link>
          </div>
        </>
      ) : (
        <div className="mobile-menu-static">
          <Link to={`/login`} onClick={() => setMobileModal(false)}>
            <li>Login</li>
          </Link>
        </div>
      )}
    </ul>
  );
};

export default MobileMenu;
