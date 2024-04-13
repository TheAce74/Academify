export default function Button({
  children,
  variant,
  className,
  ...otherProps
}) {
  return (
    <button
      className={`${
        variant === "inverted"
          ? "button-inverted"
          : variant === "accent"
            ? "button-accent"
            : "button-primary"
      } active:scale-95 px-6 py-2 rounded-md border-2 transition-colors ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}