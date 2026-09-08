import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { useTheme } from "./context/ThemeContext";

 function App() {
  const { theme } = useTheme();

  return (
    <main className={`app ${theme}`}>
      <Header />

      <div className="info">
        <strong>Exercise 6:</strong> Add a product, refresh the browser, and
        confirm that the cart is still there.
      </div>

      <ProductList />
      <Cart />
    </main>
  );
}
export default App
