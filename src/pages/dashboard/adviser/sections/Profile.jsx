import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputField";
import pic from "../../../../assets/pic.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const Profile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="max-w-lg ">
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
            <p className="font-bold text-neutral-500">Nwokoma Francisca</p>
            <p className="text-sm  text-neutral-500">csc@francisca.portal</p>
          </div>
        </div>

        <div className="mt-14">
          <form onSubmit={handleSubmit}>
            <div className="pb-5">
              <label
                htmlFor="staffname"
                className="block mb-3 text-sm text-neutral-400"
              >
                Staff name
              </label>
              <InputField
                icon={<BorderColorOutlinedIcon />}
                id="staffname"
                placeholder="Dr Nwokoma Fransica"
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
                id="staffid"
                placeholder="CSC61726"
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
