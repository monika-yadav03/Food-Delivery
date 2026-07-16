import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";
import { StoreContext } from "../../context/StoreContext";
import { useToast } from "../../context/ToastContext";

const OrderConfirmation = ({ onClose }) => {
  const { clearCart } = useContext(StoreContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleOK = () => {
    clearCart();
    onClose();
    showToast("Order placed successfully!", "success");
    navigate("/");
  };

  return (
    <div
      className="order-confirmation-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirm-title"
    >
      <div className="order-confirmation-container">
        <div className="order-confirmation-icon" aria-hidden="true">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="25" fill="none" />
            <path fill="none" d="M14 27l8 8 16-16" />
          </svg>
        </div>

        <h2 id="order-confirm-title">✅ Order Confirmed!</h2>
        <p className="order-confirmation-thanks">🎉 Thank you for your order.</p>
        <p className="order-confirmation-message">
          Your food is being prepared.
        </p>
        <p className="order-confirmation-delivery">
          Estimated delivery: 25–30 minutes.
        </p>

        <button
          type="button"
          className="order-confirmation-btn"
          onClick={handleOK}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
