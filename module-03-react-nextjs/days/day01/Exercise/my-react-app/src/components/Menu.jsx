import React from 'react'
import Dish from '../components/Dish';
const menu = [
    { id: 1, name: "Misir", price: 240 },
    { id: 2, name: "Tegabino", price: 120 },
    { id: 3, name: "Tibs", price: 280 },

];
function Menu() {
  return (
    <div>
        <h3>Rendering an array of dishes with map</h3>
        {menu.map(dish =>
        <Dish key={dish.id} name={dish.name}
        price={dish.price} />
)}
    </div>
  )
}

export default Menu;