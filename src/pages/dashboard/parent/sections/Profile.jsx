import { useState, useEffect, useRef } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputFieldTwo";
import InputFieldOne from "../../../../components/ui/InputField";
// import chris from "../../../../assets/chris.png";
// import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { customAxios } from "../../../../services/axios";
import { useAlert } from "../../../../hooks/useAlert";
import { useParent } from "../../../../hooks/useParent";
import Loader from "../../../../components/ui/Loader";
import { useParentContext } from "../../../../context/ParentContext";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Select from "../../../../components/ui/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/material/Avatar";
import { getInitials } from "../../../../utils/functions";

const Profile = () => {
  const { showAlert } = useAlert();
  const { parent } = useParentContext();
  const { getParentProfile } = useParent();
  const regNumber = useRef(null);

  const [FullScreen, setFullscreen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [initials] = useState(
    getInitials(parent?.profile?.firstName + " " + parent?.profile?.lastName)
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile();
  };

  useEffect(() => {
    let ResponsiveModal = () => {
      if (window.innerWidth < 539) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    ResponsiveModal();
    window.addEventListener("resize", ResponsiveModal);
  }, []);

  const editProfile = async () => {
    setLoading(true);
    try {
      const { data } = await customAxios.post("/parent/editProfile", {
        firstName,
        lastName,
        password,
      });
      console.log(data);
      showAlert(data?.message, {
        variant: "success",
      });
      setLoading(false);
      getParentProfile();
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const uploadChild = async () => {
    console.log(regNumber.current.value);
    try {
      setLoading(true);
      const { data } = await customAxios.post("/parent/addChild", {
        regNo: regNumber.current.value,
      });
      console.log(data);
      showAlert(data?.message, {
        variant: "success",
      });
      const mainData = getParentProfile();
      setLoading(false);
      console.log(mainData);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const DialogContent = () => {
    return (
      <div className="relative p-5 overflow-y-auto">
        <div className="absolute top-2 right-2">
          <IconButton onClick={() => setDialog(false)}>
            <HighlightOffOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
        <div>
          <p className="font-bold">Add a child</p>
          <div className="w-full my-5">
            <label
              htmlFor="number"
              className="block mb-3 text-sm text-neutral-400"
            >
              Child{`'`}s reg no.
            </label>
            <InputFieldOne
              ref={regNumber}
              id="regNumber"
              placeholder="20191111111"
              type="number"
            ></InputFieldOne>
            <Button
              disabled={!regNumber}
              onClick={uploadChild}
              className="flex mt-5 justify-center items-center px-1.5 text-sm gap-1"
            >
              {loading ? <Loader /> : <p className="pe-1.5">Add Child</p>}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(parent);
    setFirstName(parent?.profile?.firstName);
    setLastName(parent?.profile?.lastName);
  }, [parent]);

  return (
    <div>
      <div className="block sm:hidden">
        <Dialog open={dialog} fullScreen={FullScreen}>
          <DialogContent />
        </Dialog>
      </div>
      <div className="max-w-lg ">
        <p className="text-xl font-bold sm:hidden text-center mb-3">Profile</p>
        <div className="flex sm:items-center justify-between sm:flex-row flex-col">
          <div className="flex items-center  gap-1 w-full">
            <div className="flex items-center justify-between ">
              <div className="relative">
                <div className="pr-2 sm:pr-8">
                  {/* <img src={chris} alt="" /> */}
                  <Avatar
                    sx={{
                      bgcolor: "#1D4ED8",
                      width: "56px",
                      height: "56px",
                      fontSize: "17px",
                      marginLeft: "1rem",
                    }}
                  >
                    {initials}
                  </Avatar>
                </div>
                {/* <div className="absolute top-[35%] start-[35%] text-white">
                  <CameraAltOutlinedIcon />
                </div> */}
              </div>
              <div className="flex flex-col">
                <p className="max-sm:text-sm font-bold text-neutral-500">
                  {parent?.profile?.firstName + " " + parent?.profile?.lastName}
                </p>
                <p className="text-xs sm:text-sm  text-neutral-500">
                  {parent?.profile?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="sm:mt-0 mt-4 text-sm">
            {parent && parent?.children?.length > 0 ? (
              <div>
                <Button
                  variant="outlined"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="flex items-center justify-center w-[160px]"
                >
                  <span className="text-xs">My Children</span>
                  <KeyboardArrowDownIcon sx={{ color: "gray" }} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {parent?.children.map((child, index) => (
                    <MenuItem key={index} className>
                      <div className="flex items-center justify-between gap-12 pb-2 w-full">
                        <div>
                          <p className="text-neutral-400 font-medium text-base">
                            {child.user.firstName + " " + child.user.lastName}
                          </p>
                          <p className="text-neutral-400 font-light text-sm">
                            {child.reg}
                          </p>
                        </div>
                        <div>
                          <p className="text-neutral-400 text-sm">500L</p>
                        </div>
                      </div>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <div className="flex items-center justify-end w-full">
                      <button
                        className="flex justify-center items-center text-[#1B3DF1]"
                        onClick={() => setDialog(true)}
                      >
                        <p className="ps-1">
                          <AddIcon />
                        </p>
                        <p className="pe-1.5">Add Child</p>
                      </button>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => setDialog(true)}
                  className="flex justify-center items-center px-1 py-1 text-sm gap-1"
                >
                  <p className="ps-1">
                    <AddIcon />
                  </p>
                  <p className="pe-1.5">Add Child</p>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-14">
          <form onSubmit={handleSubmit}>
            <div className="pb-5">
              <label
                htmlFor="firstname"
                className="block mb-3 text-sm text-neutral-400"
              >
                First name
              </label>
              <InputField
                value={firstName}
                setValue={setFirstName}
                icon={<BorderColorOutlinedIcon />}
                id="firstname"
                placeholder="Christopher"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="lastname"
                className="block mb-3 text-sm text-neutral-400"
              >
                Last name
              </label>
              <InputField
                value={lastName}
                setValue={setLastName}
                icon={<BorderColorOutlinedIcon />}
                id="lastname"
                placeholder="Asor"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block mb-3 text-sm text-neutral-400"
                >
                  Password
                </label>
                {/* <p className="text-sm text-[#1938DB]">Change password</p> */}
              </div>
              <InputField
                value={password}
                setValue={setPassword}
                icon={<VisibilityOutlinedIcon />}
                id="password"
                placeholder="********"
                type="password"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="password2"
                className="block mb-3 text-sm text-neutral-400"
              >
                Confirm Password
              </label>
              <InputField
                value={passwordConfirm}
                setValue={setPasswordConfirm}
                icon={<VisibilityOutlinedIcon />}
                id="password2"
                placeholder="********"
                type="password"
              ></InputField>
            </div>
            <Button disabled={password !== passwordConfirm} className="w-full">
              {loading ? <Loader /> : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
