import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/HeaderStyles.css";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for the menu
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "Register", slug: "/register", active: !authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(document.documentElement.scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky">
      <div className="nav-content">
        <div className="logo">
          <a href="/">TrueCare Access</a>
        </div>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) =>
            item.active ? (
              <li className="nav-item" key={item.slug}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active header-active" : ""}`
                  }
                  aria-current="page"
                  to={item.slug}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
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
