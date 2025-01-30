import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children, roles }) => {
  const userToken = Cookies.get("accessToken");
  const isAuthenticated = userToken ? true : false;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${userToken}`, // Send token in Authorization header
            },
          }
        );
        const obj = response.data.data;
        setUser({
          _id: obj._id,
          email: obj.email,
          firstName: obj.firstName,
          lastName: obj.lastName,
          userType: obj.userType,
          contactNumber: obj.contactNumber,
        });
      } catch (err) {
        console.error("error fetching user details!" + err.message);
      } 
    };

    fetchUserDetails();
  }, []);

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
