import className from "classnames";
import "../assets/stylesheets/components/_Button.scss";
import { GoSync } from "react-icons/go";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  children?: string | ReactNode;
  loading?: boolean;
  rectangle?: boolean;
  size: string;
  to?: string;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  secondary,
  tertiary,
  children,
  loading,
  size,
  to,
  rectangle,
  outline,
  ...events
}) => {
  const classes = className("button", {
    "opacity-80": loading,
    "button-primary": primary,
    "button-secondary": secondary,
    "button-tertiary": tertiary,
    "button-small": size === "small",
    "button-medium": size === "medium",
    "button-large": size === "large",
    "button-square": rectangle,
    "button-outline": outline,
  });

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button {...events} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
