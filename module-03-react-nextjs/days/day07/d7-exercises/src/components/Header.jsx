import useCartStore from "../store/cartStore";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  // EXERCISE 5 — Narrow selector: Header only subscribes to items.length.
  const count = useCartStore((state) => state.items.length);
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div>
        <h1>Cart State Practice</h1>
        <p>Exercises 1–7 in one </p>
      </div>

      <div className="header-actions">
        <span className="badge">Items: {count}</span>
        <span className="badge">{user || "Guest"}</span>
        <button className="secondary" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <button className="secondary" onClick={user ? logout : login}>
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}
