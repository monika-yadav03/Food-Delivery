import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ openLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    getTotalCartAmount,
    searchQuery,
    setSearchQuery,
    resetHomeView,
  } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
    if (menuName === "home") {
      resetHomeView();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" onClick={() => handleMenuClick("home")} className="navbar-logo-link">
        <img src={assets.logo} alt="Tomato logo" className="logo" />
      </Link>

      <button
        type="button"
        className={`navbar-hamburger ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-menu ${mobileMenuOpen ? "mobile-open" : ""}`}>
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

      {mobileMenuOpen && (
        <div
          className="navbar-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="navbar-right">
        <div className="navbar-search-box">
          <input
            type="search"
            placeholder="Search food..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (location.pathname !== "/") {
                navigate("/");
              }
            }}
            onKeyDown={handleKeyDown}
            aria-label="Search food items"
          />
          <img
            src={assets.search_icon}
            alt=""
            role="presentation"
            className={`search-icon ${searchQuery ? "active" : ""}`}
            onClick={handleSearch}
            title="Search"
          />
        </div>

        <div className="navbar-cart-icon">
          <Link to="/cart" aria-label="View cart">
            <img src={assets.basket_icon} alt="" role="presentation" />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="dot" aria-label="Items in cart"></div>
          )}
        </div>

        <button
          type="button"
          onClick={() => openLogin()}
          className="signin-btn"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
