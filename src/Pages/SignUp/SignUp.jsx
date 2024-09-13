import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const SignUp = () => {
  // const { createUser, updateCurrentUserProfile } = useContext(AuthContext);
  const { createUser, updateCurrentUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePass = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password).then((result) => {
      const signUpUser = result.user;
      console.log(signUpUser);
      updateCurrentUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("Send user info to the database", userInfo);
              reset();
              Swal.fire({
                icon: "success",
                title: "NEW USER CREATED SUCCESSFULLY!",
                text: "Welcome back!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col md:flex-row-reverse  gap-10">
        <div className="text-center lg:text-left  md:w-1/2">
          <h1 className="text-5xl font-bold">SIGN UP NOW!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100  md:w-1/2 max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">NAME</span>
              </label>
              <input
                type="text"
                {...register("name")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PHOTO URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">EMAIL</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="mt-2 text-red-500 font-medium">
                  E-mail is required
                </span>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">PASSWORD</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "At least one uppercase letter required",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "At least one lowercase letter required",
                    hasNumber: (value) =>
                      /\d/.test(value) || "At least one number required",
                    minLength: (value) =>
                      value.length >= 6 ||
                      "Password must be at least 6 characters",
                    maxLength: (value) =>
                      value.length <= 20 ||
                      "Password must not exceed 20 characters",
                  },
                })}
                className="input input-bordered"
              />
              {/* Eye icon to toggle password visibility */}
              <button
                type="button"
                onClick={togglePass}
                className="absolute right-3 top-[52px]  text-lg text-gray-500" // Positioning the button
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="SIGN UP"
                className="btn btn-primary"
              />
            </div>
            <p className="text-center">
              Already have an account ?{" "}
              <Link to={"/login"} className="text-blue-700 font-medium ">
                LOGIN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
