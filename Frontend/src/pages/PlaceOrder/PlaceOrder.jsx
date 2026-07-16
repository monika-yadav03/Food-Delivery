import React, { useContext, useEffect, useState } from "react";

import "./placeOrder.css";

import { StoreContext } from "../../context/StoreContext";

import { useToast } from "../../context/ToastContext";

import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation";

import { useNavigate } from "react-router-dom";



const PlaceOrder = ({ openLogin }) => {

  const { getTotalCartAmount, getCartItemCount, token } = useContext(StoreContext);

  const { showToast } = useToast();

  const navigate = useNavigate();



  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const [shouldSubmitAfterLogin, setShouldSubmitAfterLogin] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);



  const subtotal = getTotalCartAmount();

  const deliveryFee = subtotal === 0 ? 0 : 2;

  const total = subtotal + deliveryFee;



  const completeOrder = async () => {

    setIsSubmitting(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setShowOrderConfirmation(true);

    } catch {

      showToast("Something went wrong. Please try again.", "error");

    } finally {

      setIsSubmitting(false);

    }

  };



  const handleSubmit = (e) => {

    e.preventDefault();



    if (getCartItemCount() === 0) {

      showToast("Your cart is empty. Add items before placing an order.", "error");

      return;

    }



    if (!token) {

      openLogin(() => setShouldSubmitAfterLogin(true));

      return;

    }



    completeOrder();

  };



  useEffect(() => {

    if (shouldSubmitAfterLogin && token) {

      setShouldSubmitAfterLogin(false);

      navigate("/order");

      completeOrder();

    }

  }, [shouldSubmitAfterLogin, token, navigate]);



  return (

    <>

      <form className="place-order" onSubmit={handleSubmit}>

        <div className="place-order-left">

          <p className="title">Delivery Information</p>



          <div className="multi-fields">

            <input type="text" placeholder="First name" required disabled={isSubmitting} aria-label="First name" />

            <input type="text" placeholder="Last name" required disabled={isSubmitting} aria-label="Last name" />

          </div>



          <input type="email" placeholder="Email address" required disabled={isSubmitting} aria-label="Email address" />

          <input type="text" placeholder="Street" required disabled={isSubmitting} aria-label="Street address" />



          <div className="multi-fields">

            <input type="text" placeholder="City" required disabled={isSubmitting} aria-label="City" />

            <input type="text" placeholder="State" required disabled={isSubmitting} aria-label="State" />

          </div>



          <div className="multi-fields">

            <input type="text" placeholder="Zip code" required disabled={isSubmitting} aria-label="Zip code" />

            <input type="text" placeholder="Country" required disabled={isSubmitting} aria-label="Country" />

          </div>



          <input type="text" placeholder="Phone" required disabled={isSubmitting} aria-label="Phone number" />

        </div>



        <div className="place-order-right">

          <h2>Order Summary</h2>



          <div className="summary-item">

            <p>Subtotal</p>

            <p>${subtotal.toFixed(2)}</p>

          </div>



          <div className="summary-item">

            <p>Delivery Fee</p>

            <p>${deliveryFee.toFixed(2)}</p>

          </div>



          <hr />



          <div className="summary-item total">

            <b>Total</b>

            <b>${total.toFixed(2)}</b>

          </div>



          <button

            type="submit"

            className="place-order-btn"

            disabled={isSubmitting}

            aria-busy={isSubmitting}

          >

            {isSubmitting ? (

              <span className="btn-loading">

                <span className="spinner"></span> Placing Order...

              </span>

            ) : (

              "Place Order"

            )}

          </button>

        </div>

      </form>



      {showOrderConfirmation && (

        <OrderConfirmation onClose={() => setShowOrderConfirmation(false)} />

      )}

    </>

  );

};



export default PlaceOrder;

