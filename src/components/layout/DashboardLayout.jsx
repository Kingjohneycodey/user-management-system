
import React, { useState } from "react";
import {
  FaAngleDown,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // const user = getUser()

  const navigate = useNavigate()


  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <header className="bg-white text-black shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="flex w-fit lg:w-24">
          <a href="/" className="-m-1.5 p-1.5 flex items-start lg:items-center gap-3 mx-auto font-bold">
            {/* <img className="h-8 w-auto rounded-full" src="l" alt="" /> */}

            <span className="text-xl">Dashboard</span>
          </a>
        </div>
        <div className="flex items-center gap-5">
          {" "}
          <button>
          <FaBell className="text-2xl hidden md:block my-auto" />{" "}
          </button>
          
          <button className="flex gap-3 content-center" onClick={()=> setDropDownOpen(!dropDownOpen)}>
            <img
              className="h-8 w-auto rounded-full"
              src="/images/profile.png"
              alt=""
            />{" "}
            <div className="text-start">
              <p className="font-bold text-sm">John</p>
              <p className="text-xs">Manager</p>
            </div>
            <div className="rounded-full p-2">
              <FaAngleDown />
            </div>
          </button>
          {dropDownOpen && (
            <div className="flex text-sm flex-col divide-y absolute bg-white top-16 right-5 border rounded-lg shadow-xl p-4">
              <NavLinks href="/dashboard/settings">
                <FaUserCog />&nbsp; Manage Account
              </NavLinks>
              <NavLinks href="/login">
              <FaSignOutAlt/>&nbsp; Logout
              </NavLinks>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 mt-16 sticky top-0">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block bg-white shadow-md text-black w-64 space-y-6 py-7 px-2 lg:relative fixed inset-y-0 lg:translate-x-0 transition duration-300 transform lg:transform-none lg:z-auto z-50`}
        >
          <button
            className="lg:hidden absolute top-4 right-4"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="sticky top-28">
            <NavLinks href="/dashboard/home">
              <MdDashboard /> &nbsp; Dashboard
            </NavLinks>
            <NavLinks href="/dashboard/users">
              <FaUser /> &nbsp; View Users
            </NavLinks>
            <NavLinks href="/dashboard/settings">
              <FaCog /> &nbsp; Manage account
            </NavLinks>

            <span
              
              className="py-2.5 px-4 rounded w-[100px] cursor-pointer transition duration-200  bg-gray-200 hover:bg-gray-400 flex items-center gap-2 fixed bottom-5" onClick={logout}
            >
              <FaSignOutAlt /> Logout
            </span>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <div className="min-h-[90vh]">
            
          <Outlet />
          </div>

          <footer className="text-gray-800 text-center">
            © 2024 User Dashboard
          </footer>
        </main>
      </div>

      {/* Footer */}
    </div>
  );
};

export default AdminLayout;
