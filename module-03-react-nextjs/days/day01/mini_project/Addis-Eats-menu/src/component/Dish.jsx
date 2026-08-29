import React from 'react'

function Dish({name, price}) {
  return (
    <div className="dish">
      <h2>{name}</h2>
      <h3>{price} ETB</h3>
    </div>
  )
}

export default Dish;