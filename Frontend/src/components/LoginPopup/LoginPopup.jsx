import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { loginUser } = useContext(StoreContext); // ✅ Context function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password); // ✅ await async login (if your context supports it)
      alert("✅ Login successful!");
      setShowLogin(false);
    } catch (err) {
      console.error("Login Error:", err);
      setError("❌ Invalid credentials. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        {/* Title Section */}
        <div className="login-popup-title">
          <h2>Welcome Back 👋</h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setShowLogin(false)}
          >
            ✕
          </button>
        </div>

        {/* Input Fields */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Error Message */}
        {error && <p className="error-text">{error}</p>}

        {/* Login Button */}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer Text */}
        <p className="signup-text">
          Don’t have an account? <span>Sign up here</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
