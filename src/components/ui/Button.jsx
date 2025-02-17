export default function Button({
  children,
  variant,
  className,
  disabled,
  ...otherProps
}) {
  return (
    <button
      disabled={disabled}
      className={`${
        variant === "inverted"
          ? "button-inverted"
          : variant === "accent"
            ? "button-accent"
            : variant === "outlined"
              ? "button-outlined"
              : "button-primary"
      } active:scale-95 px-6 py-2 rounded-md border-2 transition-colors flex justify-center items-center gap-2 ${className} ${disabled && "opacity-10"}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
