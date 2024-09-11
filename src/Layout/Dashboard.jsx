import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-72 min-h-screen bg-[#d1a054]">
        <ul className="menu">
          <li>
            <NavLink to="/dashboard/cart">My Cart</NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard  content */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
