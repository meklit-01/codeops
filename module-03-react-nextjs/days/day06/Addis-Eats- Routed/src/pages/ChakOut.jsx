import { useState } from "react";

import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    alert(
      `Order placed successfully!\nTotal: ${total} ETB`
    );

    clearCart();

    setName("");
    setPhone("");
    setArea("");
  }

  if (cart.length === 0) {
    return (
      <section>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="form-container">
      <h2>Checkout</h2>

      <p>
        Order total: <strong>{total} ETB</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="+251..."
            required
          />
        </label>

        <label>
          Area
          <input
            type="text"
            value={area}
            onChange={(event) =>
              setArea(event.target.value)
            }
            required
          />
        </label>

        <button
          type="submit"
          className="primary-button"
        >
          Place Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;