import "../assets/stylesheets/components/_FeatureItem.scss";

interface FeatureItemProps {
  title: string;
  details: string;
  icon: React.ReactNode;
  headingColor?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  details,
  icon,
  headingColor,
}) => {
  return (
    <li className="feature-item">
      <div>
        <h4 className={headingColor}>{title}</h4>
        <p>{details}</p>
      </div>
      <div className={`icon-container ${headingColor}`}>{icon}</div>
    </li>
  );
};

export default FeatureItem;
