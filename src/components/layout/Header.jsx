import { useEffect, useState } from "react";
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
import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";
import { useAlert } from "../../hooks/useAlert";
import { useAdviser } from "../../hooks/useAdviser";
import { useCoordinator } from "../../hooks/useCoordinator";
import { useParent } from "../../hooks/useParent";
import { useStudent } from "../../hooks/useStudent";
import { getInitials } from "../../utils/functions";

const defaultInitials = {
  adviser: "CA",
  student: "ST",
  parent: "PA",
  coordinator: "CC",
};

export default function Header({ toggleMenu, showMenu }) {
  const { user } = useAuthContext();
  const [profileData, setProfileData] = useState(null);
  const [initials, setInitials] = useState(defaultInitials[user.type]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const { showAlert } = useAlert();
  const { getAdviserProfile } = useAdviser();
  const { getCoordinatorProfile } = useCoordinator();
  const { getParentProfile } = useParent();
  const { getStudentProfile } = useStudent();

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

  const handleFeatureNA = () => {
    showAlert("Feature not available yet", {
      variant: "error",
    });
  };

  useEffect(() => {
    const getProfiles = async () => {
      if (user.type === "adviser") {
        const data = await getAdviserProfile();
        setInitials(getInitials(data?.profile?.name));
        setProfileData(data?.profile);
      } else if (user.type === "parent") {
        const data = await getParentProfile();
        setInitials(
          getInitials(`${data?.profile?.firstName} ${data?.profile?.lastName}`)
        );
        setProfileData(data?.profile);
      } else if (user.type === "coordinator") {
        const data = await getCoordinatorProfile();
        setInitials(getInitials(data?.profile?.name));
        setProfileData(data?.profile);
      } else {
        const data = await getStudentProfile();
        setInitials(
          getInitials(
            `${data?.student?.user?.firstName} ${data?.student?.user?.lastName}`
          )
        );
        setProfileData(data?.profile);
      }
    };
    getProfiles();
  }, [
    user.type,
    getAdviserProfile,
    getCoordinatorProfile,
    getParentProfile,
    getStudentProfile,
  ]);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div className="z-[300] flex justify-between items-center h-[10vh] w-full bg-[#E7EBFE] md:px-16 px-4 transition-element sticky top-0">
      <img src={Logo} alt="logo" className="md:w-[180px] w-[130px]" />

      <div className="flex justify-between items-center">
        <div className="hidden justify-between items-center md:flex">
          <IconButton color="dark" size="small" onClick={handleFeatureNA}>
            <HelpOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>

          <h3 className="ml-2 mr-4 mb-1">FAQ</h3>
          <IconButton color="dark" size="small" onClick={handleFeatureNA}>
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
              {/* {user.type === "adviser"
                ? "Course Adviser"
                : user.type === "parent"
                  ? "Parent"
                  : user.type === "coordinator"
                    ? "Course Coordinator"
                    : "Student"} */}
              {profileData?.name}
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleFeatureNA();
                }}
              >
                <ListItemIcon>
                  <HelpOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                FAQ
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleFeatureNA();
                }}
              >
                <ListItemIcon>
                  <NotificationsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Notifications
              </MenuItem>
            </div>
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
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
