import React, { useContext } from "react";
import "./home.css";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const { category, setCategory } = useContext(StoreContext);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />

      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
