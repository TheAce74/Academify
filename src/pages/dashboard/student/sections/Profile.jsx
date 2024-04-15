import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputField";
import chris from "../../../../assets/chris.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const Profile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
            <p className="font-bold text-neutral-500">Asor Christopher</p>
            <p className="text-sm  text-neutral-500">csc@asorchristopher</p>
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
                icon={<BorderColorOutlinedIcon />}
                id="lastname"
                placeholder="Asor"
                type="text"
              ></InputField>
            </div>
            <div className="pb-5">
              <label
                htmlFor="email"
                className="block mb-3 text-sm text-neutral-400"
              >
                Student email
              </label>
              <InputField
                id="email"
                placeholder="CSC@asorchristopher"
                type="email"
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
                <p className="text-sm text-[#1938DB]">Change password</p>
              </div>
              <InputField
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
                icon={<VisibilityOutlinedIcon />}
                id="password2"
                placeholder="********"
                type="password"
              ></InputField>
            </div>
            <Button className="w-full">Save Changes</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
