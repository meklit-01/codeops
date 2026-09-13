function CartPanel({ cart }) {
  return (
    <aside className="cart-panel">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              className="cart-item"
              key={`${item.id}-${index}`}
            >
              <span>{item.name}</span>

              <span>
                ETB {item.price}
              </span>
            </div>
          ))}

          <hr />

          <strong>
            Items: {cart.length}
          </strong>
        </>
      )}
    </aside>
  );
}

export default CartPanel;