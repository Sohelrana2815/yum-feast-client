/* eslint-disable react/no-unescaped-entities */
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);

  // Navigate and location related Hooks!
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLoginInfo = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginInfo = { email, password };
    console.log(loginInfo);

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);

        // Optionally, show an error alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
        });
      });
  };

  // Toggle pass visibility
  const togglePass = () => {
    setShowPassword((prevState) => !prevState);
  };

  //  Captcha event handler function
  const handleValidateCaptcha = (e) => {
    const captchaValue = e.target.value;

    if (validateCaptcha(captchaValue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col md:flex-row  gap-10 p-5">
        <div className="text-center lg:text-left  md:w-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100  md:w-1/2 max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLoginInfo} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">EMAIL</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">PASSWORD</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered"
                required
              />
              <button
                type="button"
                onClick={togglePass}
                className="absolute right-3 top-[52px]  text-lg text-gray-500" // Positioning the button
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>

              <input
                type="text"
                onBlur={handleValidateCaptcha}
                placeholder="FILL THE CAPTCHA"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input
                // TODO : ENABLE LATER
                disabled={false}
                type="submit"
                value="Login"
                className="btn btn-primary"
              />
            </div>
            <p className="text-center">
              Don't have an account ?{" "}
              <Link to={"/signUp"} className="text-blue-700 font-medium ">
                SIGN UP
              </Link>
            </p>
            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
