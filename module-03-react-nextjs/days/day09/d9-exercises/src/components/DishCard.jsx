import { memo, useRef, useState } from "react";
import DishModal from "./DishModsl";

function DishCard({ dish, onAdd }) {
  const [showModal, setShowModal] = useState(false);

  const viewButtonRef = useRef(null);

  // Exercise 2:
  // Deliberately make Kitfo crash.
  if (dish.name === "Kitfo") {
    throw new Error("Kitfo crashed!");
  }

  console.log("Rendering:", dish.name);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <article className="dish-card">
        <h3>{dish.name}</h3>

        <p>{dish.description}</p>

        <p className="price">
          ETB {dish.price}
        </p>

        <div className="dish-actions">
          <button onClick={() => onAdd(dish)}>
            Add to Cart
          </button>

          <button
            ref={viewButtonRef}
            onClick={handleOpenModal}
          >
            View Recipe
          </button>
        </div>
      </article>

      {showModal && (
        <DishModal
          dish={dish}
          onClose={handleCloseModal}
          triggerRef={viewButtonRef}
        />
      )}
    </>
  );
}

export default DishCard;