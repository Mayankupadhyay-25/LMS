import React from "react";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flax items-center justify-between px-4 md:px-10 lg:px-36 border-b border-gray-500 py-4">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex item-center gap-5 text-gap-5 text-gray-500">
        <div>
          <button>Become Educator</button>
          <link to="/My-enrollments"></link>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full">Create Account</button>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
