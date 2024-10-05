import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/HeaderStyles.css";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "",
      active: true,
    },
    {
      name: "Register",
      slug: "/register",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
  ];
  return (
    <nav className="navbar navbar-expand-lg bg-body-red">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item) =>
              item.active ? (
                <li className="nav-item" key={item.slug}>
                  <NavLink
                    className={({ isActive }) =>
                      ` nav-link ${isActive ? "active header-active" : ""}`
                    }
                    aria-current="page"
                    to={item.slug}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
