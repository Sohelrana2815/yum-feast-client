import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarAlt,
  FaCreditCard,
  FaHome,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import useCart from "../hooks/useCart";
const Dashboard = () => {
  const [cart] = useCart();
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
              <FaCalendarAlt />
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/payment">
              <FaCreditCard />
              PAYMENT HISTORY
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/cart">
              <FaShoppingCart />
              MY CART ({cart.length})
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/review">
              <FaStar />
              add review
            </NavLink>
          </li>
          <li>
            <NavLink className="py-3" to="/dashboard/booking">
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
