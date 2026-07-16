import { useState } from "react";
import { food_list } from "../assets/assets";
import { StoreContext } from "./StoreContext";

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = food_list.find((food) => food._id === id);
      if (item) total += item.price * cartItems[id];
    }
    return total;
  };

  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const resetHomeView = () => {
    setSearchQuery("");
    setCategory("All");
  };

  const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email?.trim() && password?.trim()) {
          setToken("demoToken123");
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const logoutUser = () => {
    setToken(null);
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getCartItemCount,
    token,
    loginUser,
    logoutUser,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    resetHomeView,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
