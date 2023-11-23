import FeatureItem from "./FeatureItem";
import { useTranslation } from "react-i18next";
import { BsGraphUp } from "react-icons/bs";
import { RiGitRepositoryFill } from "react-icons/ri";
import { IoCalendarSharp } from "react-icons/io5";
import "../assets/stylesheets/components/_FeatureList.scss";

interface FeatureListProps {}

const FeatureList: React.FC<FeatureListProps> = ({}) => {
  const { t } = useTranslation("", { keyPrefix: "components.featureList" });
  const featuresData = [
    {
      title: t("featureOneTitle"),
      details: t("featureOneDetails"),
      icon: <BsGraphUp />,
      headingColor: "secondary",
    },
    {
      title: t("featureTwoTitle"),
      details: t("featureTwoDetails"),
      icon: <IoCalendarSharp />,
      headingColor: "primary",
    },
    {
      title: t("featureThreeTitle"),
      details: t("featureThreeDetails"),
      icon: <RiGitRepositoryFill />,
      headingColor: "tertiary",
    },
  ];

  const featureItems = featuresData.map((feature) => {
    return <FeatureItem key={feature.title} {...feature} />;
  });

  return <ul id="features-container">{featureItems}</ul>;
};

export default FeatureList;
