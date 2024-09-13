import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);

          navigate("/");
        }); 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center flex flex-col justify-center items-center font-medium">
      <p>-------OR-------</p>
      <p>
        <button onClick={handleGoogleSignIn} className="btn ">
          <FcGoogle className=" text-lg" />
        </button>
      </p>
    </div>
  );
};

export default SocialLogin;
