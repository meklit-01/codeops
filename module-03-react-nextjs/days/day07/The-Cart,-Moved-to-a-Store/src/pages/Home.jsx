import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <h2>Welcome to Addis Eats</h2>
      <p>
        Discover delicious Ethiopian food made with traditional flavors.
      </p>

      <Link to="/menu" className="primary-button">
        Explore Menu
      </Link>
    </section>
  );
}

export default Home;
