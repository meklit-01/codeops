import Dish from './Dish';
const menu = [
    { id: 1, name: "Misir", price: 240 },
    { id: 2, name: "Tegabino", price: 120 },
    { id: 3, name: "Tibs", price: 280 },
    { id: 1, name: "Aynet", price: 240 },
    { id: 2, name: "shiro", price: 120 },
    { id: 3, name: "Doro", price: 500 },
    { id: 3, name: "injera", price: 80 },

];
function Menu() {
  return (
    <div>
        {menu.map(dish =>
        <Dish key={dish.id} name={dish.name}
        price={dish.price} />
)}
    </div>
  )
}

export default Menu;