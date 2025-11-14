import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // ✅ Manage popup visibility

  return (
    <Router>
      {/* ✅ Login popup appears only when showLogin = true */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        {/* ✅ Navbar can trigger login popup */}
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* ✅ Pass setShowLogin to PlaceOrder for login check */}
          <Route
            path="/order"
            element={<PlaceOrder setShowLogin={setShowLogin} />}
          />
        </Routes>
      </div>

      {/* ✅ Footer stays at bottom */}
      <Footer />
    </Router>
  );
};

export default App;
