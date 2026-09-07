import {
  Link,
  useParams,
} from "react-router-dom";

function Dish() {
  // Exercise 5: Read the id from /menu/:id
  const { id } = useParams();

  return (
    <section className="page">
      <div className="card">
        <h2>Dish Details</h2>

        <p>
          You are viewing dish number: {id}
        </p>

        {/* Exercise 2: Link */}
        <Link to="/menu">
          ← Back to Menu
        </Link>
      </div>
    </section>
  );
}

export default Dish;