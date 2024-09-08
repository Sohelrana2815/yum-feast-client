import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Root = () => {
  const location = useLocation();
  console.log(location);
  const noNavbarFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp");

  return (
    <>
      <div className="max-w-screen-xl mx-auto min-h-screen flex flex-col mt-10">
        {noNavbarFooter || <Navbar />}
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
      <div className="mt-96">{noNavbarFooter || <Footer />}</div>
    </>
  );
};

export default Root;
