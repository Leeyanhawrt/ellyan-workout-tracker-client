import "/src/assets/stylesheets/components/_MobileMenuItem.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface MobileMenuItemProps {
  to: string;
  resource: string;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ to, resource }) => {
  const authStatus = useAuth();

  return (
    <div className="mobile-menu-item">
      {authStatus && (
        <>
          <Link to={to}>
            <li className="mobile-menu-item">{resource}</li>
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileMenuItem;
