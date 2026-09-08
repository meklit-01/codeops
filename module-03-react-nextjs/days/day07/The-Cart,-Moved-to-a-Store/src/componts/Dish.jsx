import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "./Card";
import { useCartStore } from "../store/cartStore";

function Dish({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card>
      <div className="dish-card">
        <h3>{dish.name}</h3>
        <p className="category">{dish.category}</p>
        <p>{dish.description}</p>

        {dish.spicy && <span className="spicy">Spicy</span>}

        <h4>{dish.price} ETB</h4>

        <div className="dish-actions">
          <Link to={`/menu/${dish.id}`} className="details-button">
            View Details
          </Link>

          <button onClick={() => addItem(dish)} className="add-button">
            Add
          </button>
        </div>
      </div>
    </Card>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool,
    description: PropTypes.string,
  }).isRequired,
};

export default Dish;
