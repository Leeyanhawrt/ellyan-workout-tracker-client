import "../assets/stylesheets/components/_Skeleton.scss";

interface SkeletonProps {
  times: number;
  boxHeight: string;
  boxWidth: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ times, boxHeight, boxWidth }) => {
  const dimensions = {
    width: `${boxWidth}`,
    height: `${boxHeight}`,
  };

  const skeletonItems = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="skeleton-outer" style={{ ...dimensions }}>
          <div className="skeleton-inner"></div>
        </div>
      );
    });

  return <div className="skeleton-container">{skeletonItems}</div>;
};

export default Skeleton;
