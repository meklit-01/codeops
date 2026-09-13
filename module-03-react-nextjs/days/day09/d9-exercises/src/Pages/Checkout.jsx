function Checkout() {
  return (
    <section className="page">
      <h1>Checkout</h1>

      <p>
        Complete your order here.
      </p>

      <form className="checkout-form">
        <label htmlFor="name">
          Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Your name"
        />

        <label htmlFor="phone">
          TeleBirr phone
        </label>

        <input
          id="phone"
          type="tel"
          placeholder="0912345678"
        />

        <label htmlFor="area">
          Delivery area
        </label>

        <select id="area">
          <option>Bole</option>
          <option>Kazanchis</option>
          <option>Megenagna</option>
          <option>Piassa</option>
        </select>

        <button type="submit">
          Place Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;