import { useCallback, useState } from "react"
import Card from "./Card"
import Dish from "./Dish"
import CategoryBar from "./CatagoryBar"
import useFetch from "../useFetch"

const categories = ["all", "main", "side"]

function Menu() {
  const [category, setCategory] = useState("all")

  const url =
    category === "all"
      ? "/dishes.json"
      : `/dishes.json?category=${category}`

  const { data, loading, error } = useFetch(url)

  const handleSelect = useCallback((newCategory) => {
    setCategory(newCategory)
  }, [])

  const filteredMenu =
    category === "all"
      ? data
      : data.filter(
          (dish) => dish.catagory === category
        )

  return (
    <main className="menu-container">
      <h2>Our Menu</h2>

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={handleSelect}
      />

      {loading && (
        <p>Loading menu...</p>
      )}

      {error && (
        <p>Error: {error}</p>
      )}

      {!loading &&
        !error &&
        filteredMenu.length === 0 && (
          <p>No dishes found.</p>
        )}

      {!loading &&
        !error &&
        filteredMenu.length > 0 && (
          <section className="dish-list">
            {filteredMenu.map((dish) => (
              <Card key={dish.id}>
                <Dish
                  id={dish.id}
                  name={dish.name}
                  price={dish.price}
                  catagory={dish.catagory}
                  isSpicy={dish.isSpicy}
                />
              </Card>
            ))}
          </section>
        )}
    </main>
  )
}

export default Menu