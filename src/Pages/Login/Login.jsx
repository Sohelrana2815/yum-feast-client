import { useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
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
  };

  const handleValidateCaptcha = () => {
    const captchaValue = captchaRef.current.value;

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
            <div className="form-control">
              <label className="label">
                <span className="label-text">PASSWORD</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>

              <input
                type="text"
                ref={captchaRef}
                name="password"
                placeholder="FILL THE CAPTCHA"
                className="input input-bordered"
                required
              />
              <button
                className="btn btn-sm  btn-outline mt-2 "
                onClick={handleValidateCaptcha}
              >
                Validate
              </button>
            </div>
            <div className="form-control mt-6">
              <input
                disabled={disabled}
                type="submit"
                value="Login"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
