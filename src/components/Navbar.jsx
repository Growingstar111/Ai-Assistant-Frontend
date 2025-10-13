import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducer";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../common_Functions/common_function";
import { logoutUserApi } from "../Endpoints/endpoints";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.details);
  const logged = !!userDetails;

  const logoutmutation = useMutation({
    mutationFn: async () => await logoutUserApi(),
    onSuccess: (res) => {
      Toast.fire({
        title: "Logout successfully..",
        icon: "success",
      });
      dispatch(logout());
    },
    onError: (error) => {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error?.response?.data?.message || "Something went wrong",
      });
    },
  });
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-sky-400 font-bold "
      : "text-white font-bold hover:text-sky-400 transition";

  return (
    <nav className="w-full bg-gradient-to-tr from-black via-black to-black shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white font-bold text-2xl tracking-widest"
            >
              Sasta AI
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
         
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
          
            <NavLink to="/help" className={navLinkClasses}>
              Help
            </NavLink>

            {!logged ? (
              <>
                <NavLink to="/login" className={navLinkClasses}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={navLinkClasses}>
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <button
                  className="bg-purple-700 pt-0 pb-1 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => {
                    logoutmutation?.mutate();
                    localStorage.clear();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-tr from-black via-purple-800 to-purple-600 px-0 pb-4">
          <div className="flex flex-col items-center space-y-2 w-full">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/help", label: "Help" },

              ...(!logged
                ? [
                    { path: "/login", label: "Login" },
                    { path: "/signup", label: "Signup" },
                  ]
                : [{ label: "Logout", isButton: true }]),
            ].map(({ path, label, isButton }) =>
              isButton ? (
                <button
                  key={label}
                  onClick={() => {
                    logoutmutation?.mutate();
                    localStorage.clear();
                  }}
                  className="w-full text-center px-4 py-2 rounded transition text-white hover:bg-black"
                >
                  {label}
                </button>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-center px-4 py-2 rounded transition ${
                      isActive
                        ? "bg-sky-500 text-white font-semibold"
                        : "text-white hover:bg-black"
                    }`
                  }
                >
                  {label}
                </NavLink>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
