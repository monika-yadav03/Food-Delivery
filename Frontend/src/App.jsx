import React, { useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar.jsx";
import Toast from "./components/Toast/Toast";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const PageContent = ({ openLogin }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder openLogin={openLogin} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const loginSuccessCallbackRef = useRef(null);

  const openLogin = (onSuccess) => {
    loginSuccessCallbackRef.current = onSuccess || null;
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
    loginSuccessCallbackRef.current = null;
  };

  const handleLoginSuccess = () => {
    const callback = loginSuccessCallbackRef.current;
    loginSuccessCallbackRef.current = null;
    setShowLogin(false);
    callback?.();
  };

  return (
    <Router>
      <Toast />

      {showLogin && (
        <LoginPopup setShowLogin={closeLogin} onLoginSuccess={handleLoginSuccess} />
      )}

      <div className="app">
        <Navbar openLogin={openLogin} />
        <PageContent openLogin={openLogin} />
      </div>

      <Footer />
    </Router>
  );
};

export default App;
