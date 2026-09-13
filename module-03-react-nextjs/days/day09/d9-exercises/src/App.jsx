import {
  lazy,
  Profiler,
  Suspense,
  useCallback,
  useState,
} from "react";

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";
import Menu from "./components/Menu";
import CartPanel from "./components/CartPanel";

import Home from "./pages/Home";

// Lazy-loaded pages
const Checkout = lazy(
  () => import("./pages/Checkout")
);

const Receipt = lazy(
  () => import("./pages/Receipt")
);

function App() {
  const [cart, setCart] = useState([]);

  const dishes = [
    {
      id: 1,
      name: "Doro Wet",
      description:
        "Traditional Ethiopian chicken stew.",
      price: 450,
    },

    {
      id: 2,
      name: "Kitfo",
      description:
        "Seasoned minced beef served traditionally.",
      price: 500,
    },

    {
      id: 3,
      name: "Shiro",
      description:
        "Smooth Ethiopian chickpea stew.",
      price: 250,
    },

    {
      id: 4,
      name: "Tibs",
      description:
        "Sautéed meat with vegetables.",
      price: 400,
    },
  ];

  // useCallback keeps the function reference
  // stable between renders.
  const addToCart = useCallback((dish) => {
    setCart((currentCart) => [
      ...currentCart,
      dish,
    ]);
  }, []);

  // Exercise 5:
  // React Profiler callback.
  function handleProfile(
    id,
    phase,
    actualDuration
  ) {
    console.log(
      `Profiler: ${id}`,
      `| Phase: ${phase}`,
      `| Duration: ${actualDuration.toFixed(2)}ms`
    );
  }

  return (
    <BrowserRouter>
      <div className="app">

        {/* HEADER */}
        <header className="header">
          <h1>Addis Eats</h1>

          <nav>
            <Link to="/">
              Home
            </Link>

            <Link to="/menu">
              Menu
            </Link>

            <Link to="/checkout">
              Checkout
            </Link>

            <Link to="/receipt">
              Receipt
            </Link>
          </nav>
        </header>

        {/* MAIN */}
        <main className="main-content">
          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* MENU */}
            <Route
              path="/menu"
              element={
                <div>
                  <Profiler
                    id="Menu"
                    onRender={handleProfile}
                  >
                    <ErrorBoundary
                      fallback={
                        <div className="error-card">
                          <h2>
                            Menu unavailable
                          </h2>

                          <p>
                            Sorry, the menu
                            could not be displayed.
                          </p>
                        </div>
                      }
                    >
                      <Menu
                        dishes={dishes}
                        onAdd={addToCart}
                      />
                    </ErrorBoundary>
                  </Profiler>
                </div>
              }
            />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={
                <Suspense
                  fallback={
                    <div className="loading">
                      <p>
                        Loading checkout...
                      </p>
                    </div>
                  }
                >
                  <Checkout />
                </Suspense>
              }
            />

            {/* RECEIPT */}
            <Route
              path="/receipt"
              element={
                <Suspense
                  fallback={
                    <div className="loading">
                      <p>
                        Loading receipt...
                      </p>
                    </div>
                  }
                >
                  <Receipt />
                </Suspense>
              }
            />

            {/* NOT FOUND */}
            <Route
              path="*"
              element={
                <section className="page">
                  <h1>404</h1>

                  <p>
                    Page not found.
                  </p>

                  <Link to="/">
                    Go Home
                  </Link>
                </section>
              }
            />

          </Routes>
        </main>

        {/* CART */}
        <div className="cart-wrapper">
          <ErrorBoundary
            fallback={
              <div className="error-card">
                <h2>
                  Cart unavailable
                </h2>

                <p>
                  Sorry, your cart could
                  not be displayed.
                </p>
              </div>
            }
          >
            <CartPanel cart={cart} />
          </ErrorBoundary>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;