import useCartStore from "../store/cartStore";

export default function Cart() {
  // EXERCISE 5 — Each value is selected narrowly from the Zustand store.
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="cart">
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div className="cart-row" key={`${item.id}-${index}`}>
              <span>
                {item.name} — {item.price} ETB
              </span>
              <button className="secondary" onClick={() => remove(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <p className="total">Total: {total} ETB</p>
          <button className="secondary" onClick={clear}>
            Clear cart
          </button>
        </>
      )}
    </section>
  );
}
