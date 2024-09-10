import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES, LOGOUT",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "LOGOUT SUCCESSFUL",
          icon: "success",
        });
      }
    });
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">Order Food</NavLink>
      </li>
      <li>
        <NavLink to="/secret">Secret</NavLink>
      </li>
      <li>
        <Link to="/">
          <button className="btn btn-sm">
            <FaCartShopping className="text-lg text-blue-600" />
            <div className="badge badge-secondary">+99</div>
          </button>
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar max-w-screen-xl   fixed z-10 bg-opacity-30 bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Yum Feast Restaurant</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
