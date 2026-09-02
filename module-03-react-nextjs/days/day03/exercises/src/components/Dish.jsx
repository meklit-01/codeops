import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Dish({ id, name, price, catagory, currency = "ETB", isSpicy, onAdd }) {
  const [count, setCount] = useState(0)

  const handleAdd = () => {
    setCount((currentCount) => currentCount + 1)
    onAdd(price)
  }

  return (
    <div className="cards">
      <h3>{name} <span>({count})</span></h3>
      <p className="price">{price} {currency}</p>
      <p className="category">{catagory}</p>
      {isSpicy === true && <span>Spicy</span>}
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

Dish.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  catagory: PropTypes.string.isRequired,
  currency: PropTypes.string,
  isSpicy: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
}

export default Dish
