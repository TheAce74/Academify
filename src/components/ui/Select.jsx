import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectField from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function Select({
  value,
  setValue,
  placeholder = "",
  variant = "outlined",
  options = [],
  style = { marginBottom: "15px" },
}) {
  const [open, setOpen] = useState(false);
  const iconStyling = {
    color: "#808080",
    marginRight: "10px",
  };

  return (
    <div className="transition-element">
      <FormControl sx={{ ...style }} fullWidth size="small">
        <SelectField
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          variant={variant}
          IconComponent={() => (
            <>
              {open ? (
                <ExpandLessIcon sx={{ ...iconStyling }} />
              ) : (
                <ExpandMoreIcon sx={{ ...iconStyling }} />
              )}
            </>
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <MenuItem disabled value={0}>
            <span className="text-neutral-500 text-sm">{placeholder}</span>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option?.value ? option.value : option}>
              <span className="text-sm">
                {" "}
                {option?.title ? option.title : option}
              </span>
            </MenuItem>
          ))}
        </SelectField>
      </FormControl>
    </div>
  );
}
