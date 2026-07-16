import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import { useToast } from "../../context/ToastContext";

const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {
  const { loginUser } = useContext(StoreContext);
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await loginUser(email, password);
      showToast("Login successful! Welcome back.", "success");
      onLoginSuccess?.();
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid credentials. Please try again!");
      showToast("Login failed. Please check your credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2 id="login-title">Welcome Back 👋</h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setShowLogin(false)}
            aria-label="Close login popup"
          >
            ✕
          </button>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
          aria-label="Email address"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          disabled={loading}
          aria-label="Password"
        />

        {error && (
          <p className="error-text" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? (
            <span className="btn-loading">
              <span className="spinner"></span> Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        <p className="signup-text">
          Don&apos;t have an account? <span>Sign up here</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
