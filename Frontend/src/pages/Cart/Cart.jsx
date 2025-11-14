import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);

  // ✅ Valid coupons list
  const validCodes = {
    DISCOUNT10: 10,
    SAVE20: 20,
    HELLO50: 50,
    FREESHIP: "FREE",
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();

    if (validCodes[code]) {
      if (validCodes[code] === "FREE") {
        setFreeShipping(true);
        setDiscount(0);
        setMessage("🚚 Free Shipping Applied!");
      } else {
        setDiscount(validCodes[code]);
        setFreeShipping(false);
        setMessage(`🎉 ${validCodes[code]}% Discount Applied!`);
      }
    } else {
      setFreeShipping(false);
      setDiscount(0);
      setMessage("❌ Invalid Promo Code");
    }
  };

  const subtotal = getTotalCartAmount();
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = subtotal === 0 ? 0 : freeShipping ? 0 : 2;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="cart">
      {/* ---------------- CART ITEMS ---------------- */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    className="remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      {/* ---------------- CART TOTAL + PROMO ---------------- */}
      <div className="cart-bottom">
        {/* ---- TOTAL SECTION ---- */}
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="cart-total-details">
              <p>Discount</p>
              <p>- ${discountAmount.toFixed(2)}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* ---- PROMO SECTION ---- */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
          {message && <p className="promo-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
