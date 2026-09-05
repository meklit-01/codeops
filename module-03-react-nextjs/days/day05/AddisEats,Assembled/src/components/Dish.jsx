import { memo, useContext } from "react"
import PropTypes from "prop-types"
import { CartContext } from "../CortProvider"

function Dish({
  id,
  name,
  price,
  catagory,
  currency = "ETB",
  isSpicy
}) {
  const { dispatch } = useContext(CartContext)

  const handleAdd = () => {
    dispatch({
      type: "add",
      dish: {
        id,
        name,
        price,
        catagory,
        isSpicy
      }
    })
  }

  return (
    <div className="cards">
      <h3>{name}</h3>

      <p className="price">
        {price} {currency}
      </p>

      <p className="category">
        {catagory}
      </p>

      {isSpicy === true && (
        <span>Spicy</span>
      )}

      <button onClick={handleAdd}>
        Add
      </button>
    </div>
  )
}

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  catagory: PropTypes.string.isRequired,
  currency: PropTypes.string,
  isSpicy: PropTypes.bool
}

export default memo(Dish)