import "../assets/stylesheets/layout/_Footer.scss";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import classNames from "classnames";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const { t } = useTranslation("", { keyPrefix: "layouts.footer" });
  const location = useLocation();

  const socialsList = [
    {
      logo: <IoLogoLinkedin />,
      href: "https://www.linkedin.com/in/leeyan-haw/",
    },
    {
      logo: <IoLogoGithub />,
      href: "https://github.com/Leeyanhawrt",
    },
    {
      logo: <IoLogoInstagram />,
      href: "https://www.instagram.com/leeyanhawrt/",
    },
  ];

  return (
    <div className="content-container">
      <footer className={"footer"}>
        <div className="footer-content">
          <div className="socials-container">
            <ul className="socials-list">
              {socialsList.map((social) => {
                return (
                  <li>
                    <a href={social.href} target="_blank">
                      {social.logo}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="made-with-love">
            <hr></hr>
            <p>{t("designedBy")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
