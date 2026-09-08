import { products } from "../data";
import useCartStore from "../store/cartStore";

export default function ProductList() {
  // EXERCISE 5 — Narrow selector: ProductList subscribes only to addItem.
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section>
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price} ETB</p>
            <button className="primary" onClick={() => addItem(product)}>
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
