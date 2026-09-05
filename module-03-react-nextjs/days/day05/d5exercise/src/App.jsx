import Header from "./components/Header"
import Menu from "./components/Menu"
import ThemeButton from "./components/ThemeButton"
import { ThemeProvider } from "./components/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <Header />
      <ThemeButton />
      <Menu />
    </ThemeProvider>
  )
}

export default App