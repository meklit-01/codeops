import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DishList from './DishList'
import CategoryBar from './CatagoryBar'
import OrderForm from './OrderForm'

const menu = [
  { id: 1, name: "Doro Wet", price: 250, category: "main", isSpicy: true },
  { id: 2, name: "Kitfo", price: 350, category: "main", isSpicy: true },
  { id: 3, name: "Shiro", price: 150, category: "side", isSpicy: false },
  { id: 4, name: "Injera", price: 50, category: "side", isSpicy: false },
  { id: 5, name: "Ayib", price: 100, category: "side", isSpicy: false },
  { id: 6, name: "Gomen", price: 100, category: "side", isSpicy: false },
  { id: 7, name: "Tibs", price: 300, category: "main", isSpicy: true },
  { id: 8, name: "Beyainetu", price: 250, category: "main", isSpicy: false },
]

const categories = ["all", "main", "side"]

function Menu() {
  const [category, setCategory] = useState("all")
  const [orderTotal, setOrderTotal] = useState(0)

  const filteredMenu =
    category === "all"
      ? menu
      : menu.filter((dish) => dish.category === category)

  const handleAdd = (price) => {
    setOrderTotal((currentTotal) => currentTotal + price)
  }

  return (
    <main className="menu-container">

      <h1>Addis Eats Menu</h1>

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <DishList
        dishes={filteredMenu}
        onAdd={handleAdd}
      />

      <h2>Order Total: {orderTotal} ETB</h2>

      <OrderForm />

    </main>
  )
}

Menu.propTypes = {}

export default Menu