import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Dish from "../componts/Dish";
import CategoryBar from "../componts/CatagoryBar";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "All";

  useEffect(() => {
    async function fetchDishes() {
      try {
        setLoading(true);

        const response = await fetch("/dishes.json");

        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        const data = await response.json();

        setDishes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();
  }, []);

  const categories = [
    "All",
    ...new Set(dishes.map((dish) => dish.category))
  ];

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === selectedCategory
        );

  function handleCategoryChange(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category
      });
    }
  }

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryChange}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;