import React from 'react'

function Dish({name, price}) {
  return (
    <div className='dish'>
        <h1>{name}</h1>
        <p>{price} ETB</p>

    </div>
  )
}

export default Dish;