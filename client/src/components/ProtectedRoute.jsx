import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, roles }) => {
  const user = useSelector((state) => state.user); // Fetch user data from Redux store
  const isAuthenticated = !!user._id;

  if (!isAuthenticated) {
    // Redirect to Sign In if not authenticated
    return <Navigate to="/auth/signin" replace />;
  }

  if (roles && !roles.includes(user.userType)) {
    // Redirect to Home if user type is not authorized
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
