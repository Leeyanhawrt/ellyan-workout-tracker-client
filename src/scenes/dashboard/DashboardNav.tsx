import "/src/assets/stylesheets/components/_DashboardNav.scss";
import { BsPersonFillGear } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { IoBarbell } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

interface DashboardNavProps {}

const DashboardNav: React.FC<DashboardNavProps> = ({}) => {
  const [activeDashboard, setActiveDashboard] = useState<number>(0);
  const navItems = [
    {
      link: "/dashboard/workout_program",
      text: "Workout Program",
      icon: <IoBarbell />,
    },

    {
      link: "/dashboard/edit_record",
      text: "Personal Record",
      icon: <FaCrown />,
    },
    {
      link: "/dashboard/preferences",
      text: "Profile",
      icon: <BsPersonFillGear />,
    },
  ];

  const updateDashboard = (newDashboard: number) => {
    setActiveDashboard(newDashboard);
  };

  return (
    <div id="dashboard-nav">
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

export default DashboardNav;
