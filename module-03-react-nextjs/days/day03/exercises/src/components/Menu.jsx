import React, { useState } from 'react'
import Dish from './Dish'
import Card from './Card'
import CategoryBar from './CaragoryBar'

const menu = [
  { id: 1, name: "Doro Wet", price: 250, catagory: "main", isSpicy: true },
  { id: 2, name: "Kitfo", price: 350, catagory: "main", isSpicy: true },
  { id: 3, name: "Shiro", price: 150, catagory: "side", isSpicy: false },
  { id: 4, name: "Injera", price: 50, catagory: "side", isSpicy: false },
  { id: 5, name: "Ayib", price: 100, catagory: "side", isSpicy: false },
  { id: 6, name: "Gomen", price: 100, catagory: "side", isSpicy: false },
  { id: 7, name: "Tibs", price: 300, catagory: "main", isSpicy: true },
  { id: 8, name: "Beyainetu", price: 250, catagory: "main", isSpicy: false },
]

const categories = ["all", "main", "side"]

function Menu() {
  const [category, setCategory] = useState("all")
  const [orderTotal, setOrderTotal] = useState(0)

  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    area: "",
  })

  const filteredMenu =
    category === "all"
      ? menu
      : menu.filter((dish) => dish.catagory === category)

  const handleAdd = (price) => {
    setOrderTotal((currentTotal) => currentTotal + price)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setDelivery((currentDelivery) => ({
      ...currentDelivery,
      [name]: value,
    }))
  }

  const telebirrIsValid = /^(\+251\d{9}|09\d{8})$/.test(delivery.phone)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!telebirrIsValid) return

    console.log("Delivery order:", delivery)
    alert("Delivery details submitted!")
  }

  return (
    <main className="menu-container">
      <h1>Addis Eats Menu</h1>

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <section className="dish-list">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((dish) => (
            <Card key={dish.id}>
              <Dish
                id={dish.id}
                name={dish.name}
                price={dish.price}
                catagory={dish.catagory}
                isSpicy={dish.isSpicy}
                onAdd={handleAdd}
              />
            </Card>
          ))
        ) : (
          <p>No dishes found in this category.</p>
        )}
      </section>

      <h2>Order Total: {orderTotal} ETB</h2>

      <section className="delivery-form">
        <h2>Delivery Details</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={delivery.name} onChange={handleChange} required />
          </label>

          <label>
            TeleBirr Phone
            <input
              type="tel"
              name="phone"
              value={delivery.phone}
              onChange={handleChange}
              placeholder="+251912345678 or 0912345678"
              required
            />
          </label>

          {delivery.phone && !telebirrIsValid && (
            <p>Please enter a valid TeleBirr number.</p>
          )}

          <label>
            Area
            <input type="text" name="area" value={delivery.area} onChange={handleChange} required />
          </label>

          <button
            type="submit"
            disabled={
              !telebirrIsValid ||
              !delivery.name.trim() ||
              !delivery.area.trim()
            }
          >
            Submit Delivery Order
          </button>
        </form>
      </section>
    </main>
  )
}

export default Menu
