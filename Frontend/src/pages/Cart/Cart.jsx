import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, getCartItemCount } =
    useContext(StoreContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [freeShipping, setFreeShipping] = useState(false);

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
        setMessage("Free Shipping Applied!");
        showToast("Free shipping applied!", "success");
      } else {
        setDiscount(validCodes[code]);
        setFreeShipping(false);
        setMessage(`${validCodes[code]}% Discount Applied!`);
        showToast(`${validCodes[code]}% discount applied!`, "success");
      }
    } else {
      setFreeShipping(false);
      setDiscount(0);
      setMessage("Invalid Promo Code");
      showToast("Invalid promo code.", "error");
    }
  };

  const handleCheckout = () => {
    if (getCartItemCount() === 0) {
      showToast("Your cart is empty. Add items to proceed.", "error");
      return;
    }
    navigate("/order");
  };

  const subtotal = getTotalCartAmount();
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = subtotal === 0 ? 0 : freeShipping ? 0 : 2;
  const total = subtotal - discountAmount + deliveryFee;

  const cartEntries = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="cart">
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

        {cartEntries.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button type="button" onClick={() => navigate("/")}>
              Browse Menu
            </button>
          </div>
        ) : (
          cartEntries.map((item) => (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item">
                <img src={item.image} alt={item.name} />
                <p data-label="Title">{item.name}</p>
                <p data-label="Price">${item.price}</p>
                <p data-label="Qty">{cartItems[item._id]}</p>
                <p data-label="Total">${item.price * cartItems[item._id]}</p>
                <p
                  className="remove"
                  onClick={() => {
                    removeFromCart(item._id);
                    showToast(`${item.name} removed from cart.`, "info");
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${item.name} from cart`}
                  onKeyDown={(e) => e.key === "Enter" && removeFromCart(item._id)}
                >
                  X
                </p>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>

      <div className="cart-bottom">
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
          <button type="button" onClick={handleCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              aria-label="Promo code"
            />
            <button type="button" onClick={handleApplyPromo}>
              Apply
            </button>
          </div>
          {message && <p className="promo-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
