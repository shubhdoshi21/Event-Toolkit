import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, roles }) => {
  const userToken = Cookies.get('accessToken');
  const isAuthenticated = userToken ? true : false;

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
