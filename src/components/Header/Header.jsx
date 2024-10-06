import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/HeaderStyles.css";
function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
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
  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`${isSticky ? "sticky" : ""}`}>
      <div class="nav-content">
        <div class="logo">
          <a href="/">TrueCare Access</a>
        </div>
        <ul class="nav-links">
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
    </nav>
  );
}

export default Header;
