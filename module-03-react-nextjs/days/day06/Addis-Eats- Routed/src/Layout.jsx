import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "./context/CartContext";

function Layout() {
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            Addis Eats
          </Link>

          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Cart ({cartCount})
            </NavLink>

            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Checkout
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
      </footer>
    </>
  );
}

export default Layout;