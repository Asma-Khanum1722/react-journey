import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div>
        <img className="logo-img" src="../src/assets/file.png" alt="logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-element" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={({ isActive }) => (isActive ? "active-element" : "")}
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-element" : "")}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-element" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-element" : "")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
