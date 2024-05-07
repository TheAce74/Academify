import { MdOutlineEmail } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import "./Login.css"


const Login = () => {
  

  return (
    <div className="container">

      {/* Login section */}
      <section className="login-section">
        <h1>Login</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <form>

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
              type="Password"
              required
            ></InputField>
          </div>
          
          <Button type="submit" className="btn">Login</Button>
        </form>

        <div className="social">
          <p>Or Continue with</p>
          <FcGoogle className="social-icon google"/> <GrApple className="social-icon"/> 
        </div>

        <div className="register">
        <p>Don’t have  an account? <a href="#" className="link">Register<FiArrowUpRight /></a></p>
        </div>
      </section>

      {/* Login-side section */}
      <div className="section">
        <h1>Heading Goes Here</h1>
        <p>Lorem ipsum dolor sit amet consectetur. Lorem massa lobortis quam amet urna in eget eu. Pulvinar duis sed molestie faucibus.</p>
      </div>
      
            
    </div>

   
   
  )
  
}

export default Login;
