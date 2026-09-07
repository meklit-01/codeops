import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Dish from "./components/Dish";
import Login from "./components/Login";
import Checkout from "./components/Checkout";

import "./components/style.css";

// Exercise 7: RequireAuth - protect the checkout page
function RequireAuth({ children }) {
  const isLoggedIn = false;

  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

// Exercise 4: * route - show this when the page doesn't exist
function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}

function App() {
  return (
    // Exercise 1: BrowserRouter
      <Routes>

        {/* Exercise 3: Nested routes inside Layout */}
        <Route path="/" element={<Layout />}>

          {/* Exercise 4: Index route - / */}
          <Route index element={<Home />} />

          {/* Exercise 1: /menu route */}
          {/* Exercise 6: category filter uses query string */}
          <Route path="menu" element={<Menu />} />

          {/* Exercise 5: Dynamic route - /menu/:id */}
          <Route path="menu/:id" element={<Dish />} />

          {/* Exercise 7: Login */}
          <Route path="login" element={<Login />} />

          {/* Exercise 7: Protected /checkout */}
          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />

          {/* Exercise 4: NotFound */}
          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>
    
  );
}

export default App;