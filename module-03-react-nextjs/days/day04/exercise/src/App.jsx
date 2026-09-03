import { useEffect, useRef, useState } from "react";

function App() {
// Stores the dishes we get from dishes.json
const [dishes, setDishes] = useState([]);

// Exercise 5: Stores the selected category
const [category, setCategory] = useState("All");

// Search: Stores what the user types
const [search, setSearch] = useState("");

// Exercise 3: Loading state
const [loading, setLoading] = useState(true);

// Exercise 3: Error state
const [error, setError] = useState("");

// Exercise 7: Create a reference for the search input
const searchInput = useRef(null);

// Exercise 2: Fetch dishes from public/dishes.json
// Exercise 4: Check response.ok
// Exercise 5: Run again when category changes
// Exercise 6: Abort previous request
useEffect(() => {
// Exercise 6: Create a controller
const controller = new AbortController();

// Exercise 3: Start loading
setLoading(true);

// Exercise 3: Clear previous errors
setError("");

// Exercise 2: Fetch dishes
fetch("/dishes.json", {
  // Exercise 6: Connect fetch to AbortController
  signal: controller.signal,
})
  .then((response) => {
    // Exercise 4: Check if the request was successful
    if (!response.ok) {
      throw new Error("Could not load dishes.");
    }

    // Convert JSON into JavaScript data
    return response.json();
  })
  .then((data) => {
    // Exercise 5: Filter by selected category
    const filteredDishes =
      category === "All"
        ? data
        : data.filter((dish) => dish.category === category);

    // Save dishes in state
    setDishes(filteredDishes);

    // Exercise 3: Stop loading
    setLoading(false);
  })
  .catch((error) => {
    // Exercise 6: Ignore errors caused by aborting
    if (error.name === "AbortError") {
      return;
    }

    // Exercise 3: Save the error
    setError(error.message);

    // Exercise 3: Stop loading
    setLoading(false);
  });

// Exercise 6: Cleanup
// Cancel the previous request
return () => {
  controller.abort();
};

}, [category]);

// Exercise 1: Update browser tab title
// whenever the displayed dishes change
useEffect(() => {
document.title = `${dishes.length} Dishes`;
}, [dishes.length]);

// Exercise 7: Focus the search input
// after loading finishes and the input exists
useEffect(() => {
if (searchInput.current) {
searchInput.current.focus();
}
}, [loading]);

// Search: Filter dishes based on what the user types
const searchedDishes = dishes.filter((dish) =>
dish.name.toLowerCase().includes(search.toLowerCase())
);

// Exercise 3: Early return for loading
if (loading) {
return <h2>Loading...</h2>;
}

// Exercise 3: Early return for errors
if (error) {
return <h2>Error: {error}</h2>;
}

return ( <div className="app"> <h1>My Menu</h1>

  {/* Exercise 7 + Search */}
  <input
    ref={searchInput}
    type="text"
    placeholder="Search dishes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />


  {/* Exercise 5: Category buttons */}
  <div className="categories">
    <button onClick={() => setCategory("All")}>
      All
    </button>

    <button onClick={() => setCategory("Food")}>
      Food
    </button>

    <button onClick={() => setCategory("Drink")}>
      Drink
    </button>
  </div>


  {/* Shows number of displayed dishes */}
  <p>Showing {searchedDishes.length} dishes</p>


  {/* Display dish cards */}
  <div className="dish-list">
    {searchedDishes.map((dish) => (
      <div className="dish-card" key={dish.id}>
        <h2>{dish.name}</h2>

        <p>Price: {dish.price} ETB</p>

        <p>Category: {dish.category}</p>

        {dish.spicy && <span> Spicy</span>}
      </div>
    ))}
  </div>
</div>


);
}

export default App;
