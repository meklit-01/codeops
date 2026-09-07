import {
  Link,
  useSearchParams,
} from "react-router-dom";

function Menu() {
  // Exercise 6: useSearchParams
  const [searchParams, setSearchParams] =
    useSearchParams();

  const category = searchParams.get("category");

  const dishes = [
    {
      id: 1,
      name: "Doro Wot",
      category: "food",
      price: 300,
    },
    {
      id: 2,
      name: "Tibs",
      category: "food",
      price: 250,
    },
    {
      id: 3,
      name: "Ethiopian Coffee",
      category: "drink",
      price: 100,
    },
  ];

  // Exercise 6: Filter using query string
  const filteredDishes = category
    ? dishes.filter(
        (dish) => dish.category === category
      )
    : dishes;

  return (
    <section className="page">
      <h2>Our Menu</h2>

      {/* Exercise 6: Change query string */}
      <div className="filters">
        <button onClick={() => setSearchParams({})}>
          All
        </button>

        <button
          onClick={() =>
            setSearchParams({ category: "food" })
          }
        >
          Food
        </button>

        <button
          onClick={() =>
            setSearchParams({ category: "drink" })
          }
        >
          Drinks
        </button>
      </div>

      <div className="dishes">
        {filteredDishes.map((dish) => (
          <div className="card" key={dish.id}>
            <h3>{dish.name}</h3>

            <p>{dish.price} ETB</p>

            {/* Exercise 5: Link each dish to /menu/:id */}
            <Link to={`/menu/${dish.id}`}>
              View Dish
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;