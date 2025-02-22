import { MdOutlineEmail } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import "./Register.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { customAxios } from "../../services/axios";
import illustration from "../../assets/illustration.svg";
import logo from "../../assets/logo.svg";
import { useAlert } from "../../hooks/useAlert";

export const Register = () => {
  const [type, setType] = useState("adviser");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const regRef = useRef(null);
  const [advisorRef, setAdvisorRef] = useState(null);
  const [advisers, setAdvisers] = useState([]);
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const getAdvisers = async () => {
    try {
      const { data } = await customAxios.get("/advisors/get-all");
      setAdvisers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generic = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const payload =
      type === "student"
        ? {
            ...generic,
            reg: regRef.current.value,
            advisor: advisorRef,
          }
        : type === "coursecoordinator"
          ? {
              ...generic,
              role: "course_coordinator",
            }
          : generic;
    try {
      setLoading(true);
      await register(type, payload);
    } catch (e) {
      console.error(e);
      showAlert("Registration failed", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdvisers();
  }, []);

  return (
    <div className="wrapper lg:p-12">
      <section className="register-section">
        <div className="lg:w-[75%] lg:mx-auto">
          <h1 className="mb-2">Register</h1>
          <p>Who are you registering as?</p>
          <form className="my-4" onSubmit={handleSubmit}>
            <Box sx={{ minWidth: 120, marginBottom: "1em" }}>
              <FormControl fullWidth size="small">
                <InputLabel id="user-type-label-id">Role</InputLabel>
                <Select
                  labelId="user-type-label-id"
                  id="user-type-select"
                  value={type}
                  label="Role"
                  onChange={handleChange}
                  sx={{
                    padding: "0.2em",
                  }}
                >
                  <MenuItem value="adviser">Adviser</MenuItem>
                  <MenuItem value="parent">Parent</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="coursecoordinator">
                    Course Coordinator
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            {type === "adviser" ? (
              <div key="adviser">
                <div className="input-box mb-6">
                  <label htmlFor="firstName" className="name mb-2 block w-max">
                    First name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="firstName"
                    placeholder="Enter your first name"
                    type="text"
                    required
                    ref={firstNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="lastName" className="name mb-2 block w-max">
                    Last name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="lastName"
                    placeholder="Enter your last name"
                    type="text"
                    required
                    ref={lastNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="email" className="email mb-2 block w-max">
                    Email
                  </label>
                  <InputField
                    icon={<MdOutlineEmail />}
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label
                    htmlFor="password"
                    className="password mb-2 block w-max"
                  >
                    Password
                  </label>
                  <InputField
                    icon={<FiEye />}
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    ref={passwordRef}
                  />
                </div>
              </div>
            ) : type === "parent" ? (
              <div key="parent">
                <div className="input-box mb-6">
                  <label htmlFor="firstName" className="name mb-2 block w-max">
                    First name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="firstName"
                    placeholder="Enter your first name"
                    type="text"
                    required
                    ref={firstNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="lastName" className="name mb-2 block w-max">
                    Last name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="lastName"
                    placeholder="Enter your last name"
                    type="text"
                    required
                    ref={lastNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="email" className="email mb-2 block w-max">
                    Email
                  </label>
                  <InputField
                    icon={<MdOutlineEmail />}
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label
                    htmlFor="password"
                    className="password mb-2 block w-max"
                  >
                    Password
                  </label>
                  <InputField
                    icon={<FiEye />}
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    ref={passwordRef}
                  />
                </div>
              </div>
            ) : type === "coursecoordinator" ? (
              <div key="coursecoordinator">
                <div className="input-box mb-6">
                  <label htmlFor="firstName" className="name mb-2 block w-max">
                    First name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="firstName"
                    placeholder="Enter your first name"
                    type="text"
                    required
                    ref={firstNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="lastName" className="name mb-2 block w-max">
                    Last name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="lastName"
                    placeholder="Enter your last name"
                    type="text"
                    required
                    ref={lastNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="email" className="email mb-2 block w-max">
                    Email
                  </label>
                  <InputField
                    icon={<MdOutlineEmail />}
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label
                    htmlFor="password"
                    className="password mb-2 block w-max"
                  >
                    Password
                  </label>
                  <InputField
                    icon={<FiEye />}
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    ref={passwordRef}
                  />
                </div>
              </div>
            ) : (
              <div key="student">
                <div className="input-box mb-6">
                  <label htmlFor="firstName" className="name mb-2 block w-max">
                    First name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="firstName"
                    placeholder="Enter your first name"
                    type="text"
                    required
                    ref={firstNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="lastName" className="name mb-2 block w-max">
                    Last name
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="lastName"
                    placeholder="Enter your last name"
                    type="text"
                    required
                    ref={lastNameRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label htmlFor="reg" className="email mb-2 block w-max">
                    Registration number
                  </label>
                  <InputField
                    icon={<HiOutlineUser />}
                    id="reg"
                    type="text"
                    placeholder="Enter your reg no"
                    required
                    ref={regRef}
                  />
                </div>
                <Box sx={{ minWidth: 120, marginBottom: "1em" }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="adviser-id">Select Adviser</InputLabel>

                    <Select
                      placeholder="Select"
                      labelId="adviser-id"
                      id="adviser-id"
                      value={advisorRef}
                      label="Advisor Ref"
                      onChange={(e) => setAdvisorRef(e.target.value)}
                      sx={{
                        padding: "0.2em",
                      }}
                    >
                      {advisers.map((adviser, i) => (
                        <MenuItem key={i} value={adviser?._id}>
                          {adviser?.user?.firstName +
                            " " +
                            adviser?.user?.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <div className="input-box mb-6">
                  <label htmlFor="email" className="email mb-2 block w-max">
                    Email
                  </label>
                  <InputField
                    icon={<MdOutlineEmail />}
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="input-box mb-6">
                  <label
                    htmlFor="password"
                    className="password mb-2 block w-max"
                  >
                    Password
                  </label>
                  <InputField
                    icon={<FiEye />}
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    ref={passwordRef}
                  />
                </div>
              </div>
            )}
            <Button
              disabled={loading}
              className="w-full !p-3.5 mt-8 font-semibold disabled:opacity-70"
            >
              {!loading ? (
                <span>Register</span>
              ) : (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Registering...</span>
                </>
              )}
            </Button>
          </form>
          <div className="login">
            <p className="flex items-center gap-2 justify-center">
              <span>Already have an account?</span>
              <Link to="/login" className="link flex items-center gap-1">
                Login
                <FiArrowUpRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="section hidden md:block">
        <img src={logo} alt="" className="w-64 mb-5" />
        <p>The academic management platform for students and educators</p>
        <img src={illustration} alt="" className="w-96 mt-6" />
      </div>
    </div>
  );
};

export default Register;
