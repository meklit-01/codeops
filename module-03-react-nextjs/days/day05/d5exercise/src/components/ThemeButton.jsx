import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="theme">
      Current theme: {theme}
    </button>
  )
}

export default ThemeButton