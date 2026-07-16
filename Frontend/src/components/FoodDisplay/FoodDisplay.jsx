import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const filteredItems = food_list.filter((item) => {
    const matchesCategory =
      category === "All" || item.category === category;

    const query = searchQuery.toLowerCase().trim();
    const cleanQuery = query
      .replace("dessert", "desert")
      .replace("dess", "des");

    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredItems.length === 0 ? (
          <p className="food-display-empty">
            No dishes found. Try a different search or category.
          </p>
        ) : (
          filteredItems.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
