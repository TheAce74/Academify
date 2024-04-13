import { useState } from "react";
import Logo from "../../assets/logo.svg";
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header({ toggleMenu, showMenu }) {
  const [initials] = useState("PC");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleShowMenu = () => {
    toggleMenu();
  };

  return (
    <div className="z-[300] flex justify-between items-center h-[10vh] w-full bg-[#E6F7EE] md:px-7 px-3 transition-element">
      <img src={Logo} alt="logo" className="md:w-[180px] w-[130px]" />

      <div className="flex justify-between items-center">
        <div className="hidden justify-between items-center md:flex">
          <IconButton color="dark" size="small">
            <HelpOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>

          <h3 className="ml-2 mr-4 mb-1">FAQ</h3>
          <IconButton color="dark" size="small">
            <NotificationsOutlinedIcon fontSize="inherit" />
          </IconButton>
        </div>

        <div className="flex items-center">
          <Button
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="rounded-lg transition-element "
          >
            <Avatar
              sx={{
                bgcolor: "#1D4ED8",
                width: "32px",
                height: "32px",
                fontSize: "16px",
                marginLeft: "1rem",
              }}
            >
              {initials}
            </Avatar>

            <span className="ml-3 mr-8 font-semibold capitalize text-black hidden md:block">
              Course Adviser
            </span>
            <ExpandMoreIcon color="dark" />
          </Button>
          <Menu
            sx={{ width: "200px" }}
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
          >
            <div className="block md:hidden">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <HelpOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                FAQ
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <NotificationsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Notifications
              </MenuItem>
            </div>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
        {/* Hamburger */}
        <div className="block md:hidden">
          <IconButton onClick={() => toggleShowMenu(!showMenu)}>
            {!showMenu ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      </div>
    </div>
  );
}