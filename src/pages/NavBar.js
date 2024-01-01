import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { FaRegFileAlt } from "react-icons/fa";

const NavBar = () => {
  return (
    <>
      <header>
        <nav className="navbar">
          <ul>
            <li className="navBarLogo" />
            <li>
              <NavLink to="/">
                <FaRegFileAlt className="icon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="basvuru-sorgula">
                <TbReportSearch className="icon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="admin">
                <RiAdminLine className="icon" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default NavBar;
