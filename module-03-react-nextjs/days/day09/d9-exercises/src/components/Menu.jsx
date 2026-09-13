import DishCard from "./DishCard";
import ErrorBoundary from "./ErrorBoundary";

function Menu({ dishes, onAdd }) {
  return (
    <section className="menu-section">
      <h2>Our Menu</h2>

      <div className="menu-grid">
        {dishes.map((dish) => (
          <ErrorBoundary
            key={dish.id}
            fallback={
              <div className="error-card">
                <h3>Dish unavailable</h3>

                <p>
                  Sorry, this dish could not
                  be displayed.
                </p>
              </div>
            }
          >
            <DishCard
              dish={dish}
              onAdd={onAdd}
            />
          </ErrorBoundary>
        ))}
      </div>
    </section>
  );
}

export default Menu;