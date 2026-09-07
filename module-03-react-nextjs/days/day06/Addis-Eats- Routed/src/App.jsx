import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/ChakOut";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        {/* Home */}
        <Route index element={<Home />} />

        {/* Menu */}
        <Route path="menu" element={<Menu />} />

        {/* Individual dish */}
        <Route path="menu/:id" element={<DishDetail />} />

        {/* Cart */}
        <Route path="cart" element={<Cart />} />

        {/* Login */}
        <Route path="login" element={<Login />} />

        {/* Protected checkout */}
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />

        {/* Anything that doesn't match */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;