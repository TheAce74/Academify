import { useState, useEffect } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputFieldTwo";
import chris from "../../../../assets/chris.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Profile = () => {
  const { showAlert } = useAlert();
  const { parent } = useParentContext();
  const { getParentProfile } = useParent();
  const [FullScreen, setFullscreen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [regNumber, setRegNumber] = useState("");

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
    console.log(regNumber);
    try {
      setLoading(true);
      const { data } = await customAxios.post("/parent/addChild", {
        regNo: regNumber,
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
            <InputField
              value={regNumber}
              setValue={setRegNumber}
              id="regNumber"
              placeholder="20191111111"
              type="number"
            ></InputField>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-8">
              <div className="relative">
                <div>
                  <img src={chris} alt="" />
                </div>
                <div className="absolute top-[35%] start-[35%] text-white">
                  <CameraAltOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-neutral-500">
                {parent?.profile?.firstName + " " + parent?.profile?.lastName}
              </p>
              <p className="text-sm  text-neutral-500">
                {parent?.profile?.email}
              </p>
            </div>
          </div>
          <div>
            {parent && parent?.children?.length > 0 ? 
            <div>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  className='flex items-center justify-center'
                >
                  <p>My Children</p>
                  <KeyboardArrowDownIcon/>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  
                >
                  {parent?.children.map((child)=>(
                    <MenuItem className>
                      <div className="flex items-center justify-between gap-12 pb-2 w-full">
                        <div>
                          <p className="text-neutral-400 font-medium text-lg">{child.user.firstName + ' ' + child.user.lastName}</p>
                          <p className="text-neutral-400 font-light">{child.reg}</p>
                        </div>
                        <div>
                          <p className="text-neutral-400">500L</p>
                        </div>
                      </div>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <div className="flex items-center justify-end w-full">
                      <button className="flex justify-center items-center text-[#1B3DF1]" onClick={() => setDialog(true)}>
                        <p className="ps-1">
                          <AddIcon />
                        </p>
                        <p className="pe-1.5">Add Child</p>
                      </button>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            </div> : 
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
            </div> }
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
