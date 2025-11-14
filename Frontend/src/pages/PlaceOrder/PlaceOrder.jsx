import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = ({ setShowLogin }) => {
  const { getTotalCartAmount, token } = useContext(StoreContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    alert("Order placed successfully! 🎉");
  };

  return (
    <>
      <form className="place-order" onSubmit={handleSubmit}>
        {/* LEFT SIDE - DELIVERY DETAILS */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>

          <input type="email" placeholder="Email address" required />
          <input type="text" placeholder="Street" required />

          <div className="multi-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>

          <div className="multi-fields">
            <input type="text" placeholder="Zip code" required />
            <input type="text" placeholder="Country" required />
          </div>

          <input type="text" placeholder="Phone" required />
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="place-order-right">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>

          <div className="summary-item">
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>

          <hr />

          <div className="summary-item total">
            <b>Total</b>
            <b>${total}</b>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </div>
      </form>

      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="login-popup-container">
            <h3>⚠️ You have to login first</h3>
            <p>Please login to continue your order.</p>
            <div className="popup-buttons">
              <button
                className="login-btn"
                onClick={() => {
                  setShowLoginPopup(false);
                  setShowLogin(true); // ✅ Opens actual login popup
                }}
              >
                Go to Login
              </button>

              <button
                className="close-btn"
                onClick={() => setShowLoginPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
