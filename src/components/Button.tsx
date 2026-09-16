import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import AtomLogo from "../assets/atom-logo.png";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Show the little atom mascot on the left. */
  icon?: boolean;
  className?: string;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { to?: undefined };

type LinkProps = CommonProps & {
  /** Render as a client-side router link. */
  to: string;
  onClick?: () => void;
  "aria-label"?: string;
};

const base =
  "btn inline-flex items-center justify-center gap-2 rounded-full font-display font-bold transition-all duration-150 select-none " +
  "disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-card hover:brightness-105 hover:-translate-y-0.5",
  secondary:
    "bg-surface-2 text-ink border-2 border-accent hover:bg-accent/10 hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

/**
 * The site's one button. Pass `to` for navigation, `onClick` for actions.
 */
export default function Button(props: ButtonProps | LinkProps) {
  const { children, variant = "secondary", size = "md", icon = false, className = "" } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      {icon && <img src={AtomLogo} alt="" aria-hidden className="h-7 w-7 -ml-1" />}
      {children}
    </>
  );
  if ("to" in props && props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} aria-label={props["aria-label"]} className={classes}>
        {inner}
      </Link>
    );
  }
  const rest = { ...(props as ButtonProps) };
  delete rest.variant;
  delete rest.size;
  delete rest.icon;
  delete rest.className;
  delete rest.to;
  const { children: _children, ...buttonProps } = rest;
  void _children;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {inner}
    </button>
  );
}
