import React, { useEffect, useRef, useState } from "react"
import DishList from "./DishList"
import CategoryBar from "./CatagoryBar"
import OrderForm from "./OrderForm"
import { getDishes } from "../api"

// Keep categories because they are not dish data
const categories = ["all", "main", "side"]

function Menu() {
//  Store dishes fetched from dishes.json
const [dishes, setDishes] = useState([])

//Selected category
const [category, setCategory] = useState("all")

// Order total
const [orderTotal, setOrderTotal] = useState(0)

// Loading state
const [loading, setLoading] = useState(true)

//  Error state
const [error, setError] = useState(null)

// Search state
const [search, setSearch] = useState("")

// Reference to the search input
const searchInput = useRef(null)

useEffect(() => {
//  Create controller
const controller = new AbortController()

async function loadDishes() {
  // Start loading
  setLoading(true)

  //  Clear previous error
  setError(null)

  try {
    // Fetch dishes for the selected category
    const data = await getDishes(
      category,
      controller.signal
    )

    // Save fetched dishes in state
    setDishes(data)
  } catch (e) {
    // Ignore cancellation errors
    if (e.name !== "AbortError") {
      setError(e.message)
    }
  } finally {
   
    // Loading always stops
    setLoading(false)
  }
}

loadDishes()

// Cleanup
return () => {
  controller.abort()
}

// Category is a dependency

}, [category])

//  Focus search input after loading
useEffect(() => {
if (!loading && searchInput.current) {
searchInput.current.focus()
}
}, [loading])

// Search inside the currently loaded dishes
const searchedDishes = dishes.filter((dish) =>
dish.name
.toLowerCase()
.includes(search.toLowerCase())
)

// Add dish price to order total
const handleAdd = (price) => {
setOrderTotal(
(currentTotal) => currentTotal + price
)
}

//  Loading early return
if (loading) {
return <p>Loading the menu...</p>
}

// Error early return
if (error) {
return ( <p className="err">
{error} </p>
)
}

return ( <main className="menu-container">

  {/* Search input */}
  <input
    ref={searchInput}
    type="text"
    placeholder="Search dishes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />



  <CategoryBar
    categories={categories}
    selected={category}
    onSelect={setCategory}
  />

  <p>
    Showing {searchedDishes.length} dishes
  </p>

  <DishList
    dishes={searchedDishes}
    onAdd={handleAdd}
  />
  
  <h2>
    Order Total: {orderTotal} ETB
  </h2>

  <OrderForm />

</main>


)
}

export default Menu
