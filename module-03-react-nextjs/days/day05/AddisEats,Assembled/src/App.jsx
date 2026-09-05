import Header from "./components/Header"
import Menu from "./components/Menu"
import Checkout from "./components/CheckOut"
import CartProvider from "./CortProvider"
import { ThemeProvider } from "./components/ThemeContext"


function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />

        <Menu />

        <Checkout />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App