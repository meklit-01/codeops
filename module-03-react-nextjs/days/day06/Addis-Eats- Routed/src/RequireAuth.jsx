import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const location = useLocation();

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("isAuthenticated") === "true";

    setIsAuthenticated(loggedIn);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;