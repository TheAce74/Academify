import { useState, useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import Loader from "../../../../components/ui/Loader";
import InputField from "../../../../components/ui/InputFieldTwo";
import { useCoordinatorContext } from "../../../../context/CoordinatorContext";
import { customAxios } from "../../../../services/axios";
import { getInitials } from "../../../../utils/functions";
import { useAlert } from "../../../../hooks/useAlert";
import { useCoordinator } from "../../../../hooks/useCoordinator";
import Avatar from "@mui/material/Avatar";

const Profile = () => {
  const { coordinator } = useCoordinatorContext();
  const { showAlert } = useAlert();
  const { getCoordinatorProfile } = useCoordinator();
  const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordDisabled, setPasswordDisabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(
    coordinator?.profile?.name.split(" ")[0]
  );
  const [lastName, setLastName] = useState(
    coordinator?.profile?.name.split(" ")[1]
  );
  const [email, setEmail] = useState(coordinator?.profile?.email);
  const [detailsDisabled, setDetailsDisabled] = useState(true);

  // const [initials] = useState("JJ");
  const [initials, setInitials] = useState("CC");

  // const editProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await customAxios.put("/coordinators/update-profile", {
  //       firstName,
  //       lastName,
  //       email,
  //     });
  //     console.log(data);
  //     showAlert(data?.message, {
  //       variant: "success",
  //     });
  //     setLoading(false);
  //     getCoordinatorProfile();
  //   } catch (e) {
  //     showAlert(e?.response?.data?.message, {
  //       variant: "error",
  //     });
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!detailsDisabled) {
      try {
        await customAxios.put("/coordinators/update-profile", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          courses: [],
        });
        setDetailsDisabled(true);
        setLoading(false);
        showAlert("Profile updated successfully", {
          variant: "success",
        });
        getCoordinatorProfile();
      } catch (e) {
        showAlert(e?.response?.data?.message, {
          variant: "error",
        });
        setLoading(false);
      }
    } else {
      try {
        await customAxios.put("/coordinators/update-password", {
          currentPassword: password?.oldPass,
          newPassword: password?.confirmNew,
        });
        setPassword({ new: "", confirmNew: "", oldPass: "" });
        setPasswordDisabled(true);
        setLoading(false);
        showAlert("Password updated successfully", {
          variant: "success",
        });
      } catch (e) {
        showAlert(e?.response?.data?.message, {
          variant: "error",
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (coordinator) {
      setInitials(getInitials(coordinator?.profile?.name));
    }
  }, [coordinator]);

  return (
    <div className="font-jakarta">
      <div className="max-w-lg">
        <div className="flex items-center">
          <div className="mr-8">
            <div className="relative">
              <div>
                {/* <img src={pic} alt="" /> */}
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
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-neutral-500">
              {coordinator?.profile?.name}
            </p>
            <p className="text-sm  text-neutral-500">
              {coordinator?.profile?.email}
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
                value={firstName}
                setValue={setFirstName}
                disabled={detailsDisabled}
                // icon={<BorderColorOutlinedIcon />}
                id="firstName"
                placeholder="First Name"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="lastName"
                className="block mb-3 text-sm text-neutral-400"
              >
                Last Name
              </label>
              <InputField
                value={lastName}
                setValue={setLastName}
                disabled={detailsDisabled}
                id="lastName"
                placeholder="Last Name"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="email"
                className="block mb-3 text-sm text-neutral-400"
              >
                Email
              </label>
              <InputField
                // icon={<BorderColorOutlinedIcon />}
                value={email}
                setValue={setEmail}
                disabled={detailsDisabled}
                id="email"
                placeholder="Email address"
                type="email"
              ></InputField>
            </div>
            <div className="pb-5">
              <div className="flex justify-between">
                <label
                  htmlFor="currentPassword"
                  className="block mb-3 text-sm text-neutral-400"
                >
                  Current Password
                </label>
                <p
                  onClick={() => setPasswordDisabled(!passwordDisabled)}
                  className="text-sm text-[#1938DB] cursor-pointer"
                >
                  {passwordDisabled ? "Change Password" : "Cancel"}
                </p>
              </div>
              <InputField
                value={password.oldPass}
                setValue={(value) =>
                  setPassword({ ...password, oldPass: value })
                }
                disabled={passwordDisabled}
                icon={<VisibilityOutlinedIcon />}
                id="password"
                placeholder="********"
                type="password"
              ></InputField>
            </div>
            <div className="pb-5">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block mb-3 text-sm text-neutral-400"
                >
                  New Password
                </label>
                {/* <p
                  onClick={() => setPasswordDisabled(!passwordDisabled)}
                  className="text-sm text-[#1938DB] cursor-pointer"
                >
                  {passwordDisabled ? "Change Password" : "Cancel"}
                </p> */}
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
                Confirm New Password
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
