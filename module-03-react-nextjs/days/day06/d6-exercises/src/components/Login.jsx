import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Exercise 7:
  // Remember where the user wanted to go
  const from =
    location.state?.from?.pathname || "/";

  function handleLogin() {
    console.log("User logged in");

    // Exercise 7:
    // Return user to the original page
    navigate(from, { replace: true });
  }

  return (
    <section className="page">
      <div className="card">
        <h2>Login</h2>

        <p>Please sign in to continue.</p>

        {/* Exercise 7: Sign in */}
        <button onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </section>
  );
}

export default Login;