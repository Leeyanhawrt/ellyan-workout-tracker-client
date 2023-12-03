import "../assets/stylesheets/components/_MobileMenu.scss";
import MobileMenuItem from "./MobileMenuItem";

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const menuItems = [{ to: `/dashboard`, resource: `Dashboard` }];

  return (
    <ul className="mobile-menu">
      {menuItems.map((item) => {
        return <MobileMenuItem {...item} />;
      })}
    </ul>
  );
};

export default MobileMenu;
