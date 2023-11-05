import className from "classnames";
import "../assets/stylesheets/components/_Button.scss";
import { GoSync } from "react-icons/go";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  children?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  secondary,
  tertiary,
  children,
  loading,
  ...events
}) => {
  const classes = className("button", {
    "opacity-80": loading,
    "button-primary": primary,
    "button-secondary": secondary,
    "button-tertiary": tertiary,
  });

  return (
    <button {...events} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
