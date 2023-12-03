import "../assets/stylesheets/components/_MobileMenuItem.scss";
import { Link } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../contexts/AuthContext";
import { toast } from "react-toastify";

interface MobileMenuItemProps {
  to: string;
  resource: string;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ to, resource }) => {
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.success(`Successfully Logged Out!`);
  };

  return (
    <div className="mobile-menu-item">
      {authStatus ? (
        <>
          <Link to={to}>
            <li className="mobile-menu-item">{resource}</li>
          </Link>
          <Link to="/" onClick={handleLogout}>
            <li className="mobile-menu-item">Logout</li>
          </Link>
        </>
      ) : (
        <Link to={`/login`}>
          <li className="mobile-menu-item">Login</li>
        </Link>
      )}
    </div>
  );
};

export default MobileMenuItem;
