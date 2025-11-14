import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const { getTotalCartAmount, setSearchQuery } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  // 🌀 Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // 📍 Handle menu navigation
  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    if (menuName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🔍 Search function
  const handleSearch = () => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return; // don't search if empty
    setSearchQuery(query);
    navigate("/"); // redirect to homepage (where items are displayed)
    setSearchTerm(""); // clear search box after search
  };

  // Press Enter to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="navbar">
      {/* ---------- Logo ---------- */}
      <Link to="/" onClick={() => handleMenuClick("home")}>
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* ---------- Menu Links ---------- */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => handleMenuClick("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => handleMenuClick("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => handleMenuClick("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => handleMenuClick("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* ---------- Right Section ---------- */}
      <div className="navbar-right">
        {/* 🔍 Search Box */}
        <div className="navbar-search-box">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            src={assets.search_icon}
            alt="search"
            className={`search-icon ${searchTerm ? "active" : ""}`}
            onClick={handleSearch}
            title="Search"
          />
        </div>

        {/* 🛒 Cart Icon */}
        <div className="navbar-cart-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {/* 🔐 Login Button */}
        <button onClick={() => setShowLogin(true)} className="signin-btn">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
