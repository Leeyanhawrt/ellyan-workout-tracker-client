import { useTranslation } from "react-i18next";

import "../assets/stylesheets/layout/_Footer.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const { t } = useTranslation("", { keyPrefix: "layouts.footer" });
  return <footer></footer>;
};

export default Footer;
