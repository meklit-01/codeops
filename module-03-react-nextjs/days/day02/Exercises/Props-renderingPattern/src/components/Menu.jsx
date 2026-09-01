import Dish from "./Dish";
import Card from "./Card";

function Menu() {
  const menu = [
    {
      id: 1,
      name: "Doro Wat",
      price: 350,
      category: "Main",
      spicy: true,
    },
    {
      id: 2,
      name: "Tibs",
      price: 400,
      category: "Main",
      spicy: false,
    },
    {
      id: 3,
      name: "Shiro",
      price: 200,
      category: "Main",
      spicy: true,
    },
    {
      id: 4,
      name: "Firfir",
      price: 180,
      category: "Breakfast",
      spicy: false,
    },
  ];

  const category = "Main";

  const filteredMenu = menu.filter(
    (dish) => dish.category === category
  );

  // Early return
  if (filteredMenu.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <section>
      <h2>{category} Menu</h2>

      {filteredMenu.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </section>
  );
}

export default Menu;