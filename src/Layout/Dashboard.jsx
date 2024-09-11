import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCreditCard,
  FaHome,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
const Dashboard = () => {
  return (
    <div className="flex ">
      {/* Dashboard sidebar */}
      <div className="w-72 min-h-screen p-4 bg-[#d1a054]">
        <ul className="menu uppercase space-y-5">
          <li>
            <NavLink className="py-3" to="/dashboard/userHome">
              <FaHome />
              USER HOME
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/reservation">
              <FaCreditCard />
              PAYMENT HISTORY
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/paymentHistory">
              <FaShoppingCart />
              MY CART
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/cart">
              <FaStar />
              add review
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/myBooking">
              <FaCalendar />
              my booking
            </NavLink>
          </li>
          <div className="divider"></div>

          <li>
            <NavLink className="py-3" to="/">
              <FaHome className="text-xl" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/order/salad">
              <FaBookBookmark className="text-xl" />
              Menu
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard  content */}
      <div className="flex-grow">
        <div className="max-w-screen-xl mx-auto mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
