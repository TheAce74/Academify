import { MdOutlineEmail } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import "./Login.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import illustration from "../../assets/illustration.svg";
import logo from "../../assets/logo.svg";
import { useAlert } from "../../hooks/useAlert";

const Login = () => {
  const [type, setType] = useState("adviser");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      setLoading(true);
      await login(type, payload);
    } catch (e) {
      console.error(e);
      showAlert("Login failed", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper lg:p-20">
      <section className="login-section">
        <div className="lg:w-[75%] lg:mx-auto">
          <h1 className="mb-2">Login</h1>
          <p>Who are you logging in as?</p>
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
              <label htmlFor="password" className="password mb-2 block w-max">
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
            <Button
              disabled={loading}
              className="w-full !p-3.5 mt-8 font-semibold disabled:opacity-70"
            >
              {!loading ? (
                <span>Login</span>
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
                  <span>Logging in...</span>
                </>
              )}
            </Button>
          </form>
          <div className="register">
            <p className="flex items-center gap-2 justify-center">
              <span>Don&apos;t have an account?</span>
              <Link to="/register" className="link flex items-center gap-1">
                Register
                <FiArrowUpRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Login-side section */}
      <div className="section hidden md:block">
        <img src={logo} alt="" className="w-64 mb-5" />
        <p>The academic management platform for students and educators</p>
        <img src={illustration} alt="" className="w-96 mt-6" />
      </div>
    </div>
  );
};

export default Login;
