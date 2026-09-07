import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page">
      <h2>Welcome to Habesha Eatery</h2>

      <p>
        Enjoy delicious Ethiopian food and drinks.
      </p>

      {/* Exercise 2: Link */}
      <Link className="button" to="/menu">
        View Menu
      </Link>
    </section>
  );
}

export default Home;