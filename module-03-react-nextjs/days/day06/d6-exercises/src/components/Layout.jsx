import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* Exercise 3: Header */}
      <header>
        <h1>Habesha Eatery</h1>
      </header>

      {/* Exercise 2: NavLink */}
      <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/menu">Menu</NavLink>

        <NavLink to="/checkout">Checkout</NavLink>
      </nav>

      {/* Exercise 3: Outlet */}
      <main>
        <Outlet />
      </main>

      {/* Exercise 3: Footer */}
      <footer>
        <p>© 2026 Habesha Eatery</p>
      </footer>
    </>
  );
}

export default Layout;