import { createContext, useState, useMemo } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  // 🛒 Cart States
  const [cartItems, setCartItems] = useState({});
  
  // 🔐 Login Token (for demo)
  const [token, setToken] = useState(null);

  // 🔍 Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // 🛒 Add to Cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // ❌ Remove from Cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
  };

  // 💰 Get Total Cart Amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = food_list.find((food) => food._id === id);
      if (item) total += item.price * cartItems[id];
    }
    return total;
  };

  // 🔐 Fake Login
  const loginUser = (email, password) => {
    if (email && password) {
      setToken("demoToken123");
      console.log("✅ User logged in");
    }
  };

  // 🚪 Logout
  const logoutUser = () => {
    setToken(null);
    console.log("❌ User logged out");
  };

  // 🔍 Filter food list based on search query (optimized)
  const filteredFoodList = useMemo(() => {
    if (!searchQuery) return food_list;
    return food_list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 🌍 Global Context Value
  const contextValue = {
    food_list: filteredFoodList, // auto updates with search
    all_food_list: food_list, // keep original list if needed
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    loginUser,
    logoutUser,
    searchQuery,
    setSearchQuery,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
