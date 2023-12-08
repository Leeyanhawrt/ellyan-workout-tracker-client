import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import "/src/assets/stylesheets/components/_AdminNav.scss";

interface AdminNavProps {}

const AdminNav: React.FC<AdminNavProps> = ({}) => {
  const [activeDashboard, setActiveDashboard] = useState<number | null>(null);
  const navItems = [
    {
      link: "/admin/manage_users",
      text: "Manage Users",
      icon: <FaUsers />,
    },
  ];

  const updateDashboard = (newDashboard: number) => {
    setActiveDashboard(newDashboard);
  };

  return (
    <div id="admin-nav">
      <nav>
        <ul className="nav-list">
          {navItems.map((item, index) => {
            const { link, text, icon } = item;
            return (
              <Link
                to={link}
                key={index}
                className={`nav-item ${
                  index === activeDashboard ? "nav-item-active" : ""
                }`}
                onClick={() => updateDashboard(index)}
              >
                <li>
                  {icon}
                  <p>{text}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
