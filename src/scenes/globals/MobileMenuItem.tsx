import "/src/assets/stylesheets/components/_MobileMenu.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";

interface MobileMenuItemProps {
  to: string;
  resource: string;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ to, resource }) => {
  const authStatus = useAuth();
  const { setMobileModal } = useModal();

  return (
    <div className="mobile-menu-item">
      {authStatus && (
        <>
          <Link to={to} onClick={() => setMobileModal(false)}>
            <li className="mobile-menu-item">{resource}</li>
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileMenuItem;
