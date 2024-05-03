import { MdOutlineEmail } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import "./Register.css"

export const Register = () => {
  return (
    <div className="container">

      {/* Register section */}
      <section className="register-section">
        <h1>Register</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <form>
        <div className="input-box">
          <label
            htmlFor="name"
            className="name"
          >
            Name
          </label>
          <InputField
              icon={<HiOutlineUser />}
            id="name"
            placeholder="Enter your Name"
            type="name"
            required
          ></InputField>
        </div>

        <div className="input-box">
          <label
            htmlFor="email"
            className="email"
          >
            Email
          </label>
          <InputField
              icon={<MdOutlineEmail />}
            id="email"
            placeholder="Enter your Email"
            type="email"
            required
          ></InputField>
        </div>

        <div className="input-box">
          <label
            htmlFor="password"
            className="password"
          >
            Password
          </label>
          <InputField
              icon={<FiEye />}
            id="password"
            placeholder="Enter your Password"
            type="password"
            required
          ></InputField>
        </div>
          
        <p className="terms-and-condition">I agree with<a href="#" className="terms"> Terms of Use</a> and <a href="#" className="terms">Privacy Policy</a></p>
        <Button className="btn">Register</Button>
        </form>
        <div className="social">
        <p>Or Continue with</p>
        <FcGoogle className="social-icon"/> <GrApple className="social-icon"/>
        </div>
        <div className="login">
        <p>Already have an account? <a href="#" className="link">Login<FiArrowUpRight /></a></p>
        </div>
      </section>

      {/* Register-side section */}
      <section className="section">
        <h1>Heading Goes Here</h1>
        <p>Lorem ipsum dolor sit amet consectetur. Lorem massa lobortis quam amet urna in eget eu. Pulvinar duis sed molestie faucibus.</p>
      </section>
    </div>

   
   
  )
  
}

export default Register;
