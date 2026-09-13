import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function DishModal({ dish, onClose, triggerRef }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Move keyboard focus into the modal
    modalRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      // Return focus to the button
      // that opened the modal.
      triggerRef.current?.focus();
    };
  }, [onClose, triggerRef]);

  return createPortal(
    <div className="modal-overlay">
      <div
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        tabIndex="-1"
        ref={modalRef}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close recipe"
        >
          ×
        </button>

        <h2 id="dish-modal-title">
          {dish.name}
        </h2>

        <p>{dish.description}</p>

        <p className="price">
          ETB {dish.price}
        </p>

        <p>
          This is the recipe information for{" "}
          {dish.name}.
        </p>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>,

    document.body
  );
}

export default DishModal;