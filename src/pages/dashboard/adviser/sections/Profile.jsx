import { useState } from "react";
// import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import Loader from "../../../../components/ui/Loader";
import InputField from "../../../../components/ui/InputFieldTwo";
import pic from "../../../../assets/pic.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useAdviserContext } from "../../../../context/AdviserContext";
import { customAxios } from "../../../../services/axios";
import { useAlert } from "../../../../hooks/useAlert";

const Profile = () => {
  const { adviser } = useAdviserContext();
  const { showAlert } = useAlert();
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [detailsDisabled, setDetailsDisabled] = useState(true);
  const [password, setPassword] = useState({ new: "", confirmNew: "" });
  const [loading, setLoading] = useState(false);
  const [staffName, setStaffName] = useState(adviser?.profile?.name);
  const [staffEmail, setStaffEmail] = useState(adviser?.profile?.email);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!detailsDisabled) {
      try {
        await customAxios.put("/advisors/update", {
          firstName: staffName.split(" ")[0],
          lastName: staffName.split(" ")[1],
          email: staffEmail,
          level: adviser?.profile?.level,
        });
        setDetailsDisabled(true);
        setLoading(false);
      } catch (e) {
        showAlert(e?.response?.data?.message, {
          variant: "error",
        });
        setLoading(false);
      }
    } else {
      try {
        await customAxios.put("/advisors/update-password", {
          newPassword: password?.confirmNew,
        });
        setPassword({ new: "", confirmNew: "" });
        setPasswordDisabled(true);
        setLoading(false);
      } catch (e) {
        showAlert(e?.response?.data?.message, {
          variant: "error",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="font-jakarta">
      <div className="max-w-lg">
        <div className="flex items-center">
          <div className="mr-8">
            <div className="relative">
              <div>
                <img src={pic} alt="" />
              </div>
              <div className="absolute top-[35%] start-[35%] text-white">
                <CameraAltOutlinedIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-neutral-500">
              {adviser?.profile?.name}
            </p>
            <p className="text-sm  text-neutral-500">
              {adviser?.profile?.email}
            </p>
          </div>
        </div>

        <div className="mt-14">
          <form onSubmit={handleSubmit}>
            <div className="pb-5">
              <div className="flex justify-between">
                <label
                  htmlFor="staffname"
                  className="block mb-3 text-sm text-neutral-400"
                >
                  Staff name
                </label>
                <p
                  onClick={() => setDetailsDisabled(!detailsDisabled)}
                  className="text-sm text-[#1938DB] cursor-pointer"
                >
                  {detailsDisabled ? "Edit profile" : "Cancel"}
                </p>
              </div>
              <InputField
                value={staffName}
                setValue={setStaffName}
                disabled={detailsDisabled}
                // icon={<BorderColorOutlinedIcon />}
                id="staffname"
                placeholder="Name"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="staffid"
                className="block mb-3 text-sm text-neutral-400"
              >
                Staff ID
              </label>
              <InputField
                value={staffEmail}
                setValue={setStaffEmail}
                disabled={detailsDisabled}
                id="staffid"
                placeholder="Id"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="level"
                className="block mb-3 text-sm text-neutral-400"
              >
                Level
              </label>
              <InputField
                // icon={<BorderColorOutlinedIcon />}
                id="level"
                disabled
                placeholder="400"
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
                <p
                  onClick={() => setPasswordDisabled(!passwordDisabled)}
                  className="text-sm text-[#1938DB] cursor-pointer"
                >
                  {passwordDisabled ? "Change Password" : "Cancel"}
                </p>
              </div>
              <InputField
                value={password.new}
                setValue={(value) => setPassword({ ...password, new: value })}
                disabled={passwordDisabled}
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
                value={password.confirmNew}
                setValue={(value) =>
                  setPassword({ ...password, confirmNew: value })
                }
                disabled={passwordDisabled}
                icon={<VisibilityOutlinedIcon />}
                id="password2"
                placeholder="********"
                type="password"
              ></InputField>
            </div>
            <Button
              disabled={
                (passwordDisabled || password.new !== password.confirmNew) &&
                detailsDisabled
              }
              className="w-full"
            >
              {loading ? <Loader /> : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
