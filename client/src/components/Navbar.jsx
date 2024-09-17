import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Navbar(props) {
  const [nav, setNav] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = useLogout();

  function handleSignUp() {
    navigate("signup");
  }

  function setNavFixed() {
    if (window.scrollY > 50) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  function handleNav() {
    setNav((prev) => !prev);
  }

  window.addEventListener("scroll", setNavFixed);

  let navClass =
    "flex justify-between items-center h-16 w-full mx-auto px-4 text-white fixed z-10 ease-in-out duration-200";

  let liClass = "p-4 flex flex-col relative";

  if (isScroll) {
    navClass += "bg-white ease-in-out duration-300";
    liClass += "text-gray-500";
  }

  return (
    <>
      <div className={navClass}>
        <h1 className="w-full text-3xl font-bold text-[#ff5100]">TMRS</h1>
        <ul className="hidden md:flex md:items-center">
          {user.currentUser && (
            <li className={liClass}>
              <p>{user.currentUser.email}</p>
            </li>
          )}
          <li className={liClass}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#ff5100]" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li className={liClass}>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? "text-[#ff5100]" : "hover:text-gray-300"
              }
            >
              Movies
            </NavLink>
          </li>
          {!user.currentUser && (
            <li className={liClass}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-[#ff5100]" : "hover:text-gray-300"
                }
              >
                Login
              </NavLink>
            </li>
          )}
          {user.currentUser ? (
            <li className="p-4">
              <button
                onClick={handleLogout}
                className="bg-[#ff5100] rounded-md py-1 w-[80px] hover:bg-[#c63600]"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="p-4">
              <button
                onClick={handleSignUp}
                className="bg-[#ff5100] rounded-md py-1 w-[80px] hover:bg-[#c63600]"
              >
                Sign Up
              </button>
            </li>
          )}
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] border-r h-full bg-[#000300] border-r-gray-900 ease-in-out duration-500 md:hidden"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="w-full text-3xl font-bold m-4">TMRS</h1>
          <ul className="uppercase">
            <li className="p-4 border-b border-gray-600">Home</li>
            <li className="p-4 border-b border-gray-600">Movies</li>
            <li className="p-4 border-b border-gray-600">Login</li>
            <li className="p-4 border-b border-gray-600">Sign Up</li>
            <li className="p-4">Home</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
