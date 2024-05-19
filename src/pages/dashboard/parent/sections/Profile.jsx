import { useState, useEffect } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputFieldTwo";
import chris from "../../../../assets/chris.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { customAxios } from "../../../../services/axios";
import { useAlert } from "../../../../hooks/useAlert";
import Loader from "../../../../components/ui/Loader";
import { useParentContext } from "../../../../context/ParentContext";

const Profile = () => {
  const { showAlert } = useAlert();
  const { parent } = useParentContext();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile();
  };

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
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(parent);
    setFirstName(parent?.profile?.firstName);
    setLastName(parent?.profile?.lastName);
  }, [parent]);

  return (
    <div>
      <div className="max-w-lg ">
        <p className="text-xl font-bold sm:hidden text-center mb-3">Profile</p>
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
              <label
                htmlFor="number"
                className="block mb-3 text-sm text-neutral-400"
              >
                Child{`'`}s reg no.
              </label>
              <InputField
                id="regNumber"
                placeholder="2019223334343"
                type="number"
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
                icon={<BorderColorOutlinedIcon />}
                id="level"
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
            <Button className="w-full">
              {loading ? <Loader /> : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
