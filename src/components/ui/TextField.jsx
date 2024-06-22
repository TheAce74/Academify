import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function TextField({
  className,
  placeholder = "",
  value,
  iconName,
  end,
  start,
  setValue,
}) {
  const getIconFromName = (iconName) => {
    switch (iconName) {
      case "search":
        return <SearchOutlinedIcon sx={{ color: "#808080" }} />;
    }
  };
  const icon = getIconFromName(iconName);
  return (
    <div
      className={`relative border border-neutral-500 focus-within:border-primary-400 rounded-md px-4 py-3 text-sm flex items-center w-[min(100%,_500px)]`}
    >
      {start && <div className="mr-2">{icon}</div>}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`outline-none p-0 border-none  ${className}`}
      />

      {end && <div className="ml-2">{icon}</div>}
    </div>
  );
}
