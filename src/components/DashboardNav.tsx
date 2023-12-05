import "../assets/stylesheets/components/_DashboardNav.scss";
import { BsPersonFillGear } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { IoBarbell } from "react-icons/io5";
import { Link } from "react-router-dom";

interface DashboardNavProps {}

const DashboardNav: React.FC<DashboardNavProps> = ({}) => {
  const navItems = [
    {
      link: "/dashboard/preferences",
      text: "Profile",
      icon: <BsPersonFillGear />,
    },
    {
      link: "/dashboard/edit_record",
      text: "Personal Record",
      icon: <FaCrown />,
    },
    {
      link: "/dashboard/workout_program",
      text: "Workout Program",
      icon: <IoBarbell />,
    },
  ];

  return (
    <div id="dashboard-nav">
      <nav>
        <ul className="nav-list">
          {navItems.map((item) => {
            const { link, text, icon } = item;
            return (
              <li className="nav-item">
                <Link to={link}>
                  {icon}
                  <p>{text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardNav;
