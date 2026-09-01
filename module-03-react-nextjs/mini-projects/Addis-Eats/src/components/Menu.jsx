import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function Menu({ menu, category }) {
  // Filter dishes by category
  const filteredMenu = menu.filter(
    (dish) => dish.category === category
  );

  // Early return if no dishes match
  if (filteredMenu.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <section>
      <h2>{category} Dishs</h2>

      <div className="menu-grid">
        {filteredMenu.map((dish) => (
          <Card key={dish.id}>
            <Dish
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default Menu;