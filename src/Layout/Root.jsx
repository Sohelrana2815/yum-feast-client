import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Root = () => {
  const location = useLocation();
  console.log(location);
  const isLogin = location.pathname.includes("login");

  return (
    <>
      <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col mt-10">
        {isLogin || <Navbar />}
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
      <div className="mt-96">{isLogin || <Footer />}</div>
    </>
  );
};

export default Root;
