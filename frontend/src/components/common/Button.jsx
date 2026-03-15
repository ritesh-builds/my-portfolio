import { Link } from "react-router-dom";

function Button({
  children,
  href,
  to,
  variant = "primary",
  external = false,
  disabled = false,
  type = "button",
  ...rest
}) {
  const className = `button button-${variant}${disabled ? " button-disabled" : ""}`;

  if (href) {
    return (
      <a
        className={className}
        href={disabled ? undefined : href}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link className={className} to={disabled ? "#" : to} aria-disabled={disabled} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} disabled={disabled} type={type} {...rest}>
      {children}
    </button>
  );
}

export default Button;
