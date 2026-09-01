import Menu from "./components/Menu";
import menu from "./data.js";
import "./css/style.css";

function App() {
  return (
    <main>
      <h1>Addis Eats Menu</h1>

      <Menu
        menu={menu}
        category="Main"
      />
    </main>
  );
}

export default App;