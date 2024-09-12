import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
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
