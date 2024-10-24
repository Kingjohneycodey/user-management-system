import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({
  href,
  children,
}) => {
  return (
    <div className={`mb-4`}>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `flex items-center rounded-md cursor-pointer p-2 hover:bg-indigo-700 hover:text-white ${
            isActive ? "bg-indigo-600 text-white" : ""
          }`
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default NavLinks;
