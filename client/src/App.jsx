import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Pages and Components
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import VerifyAccount from "./components/VerifyAccount";
import Profile from "./pages/Profile";
import Payment from "./components/Payment";
import Panel from "./pages/Panel";
import AddServices from "./components/Panel/AddServices";
import MyServices from "./components/Panel/MyServices";
import Vendor from "./components/Vendor";
import AddVenue from "./components/Panel/AddVenue";
import AddSubVenue from "./components/Panel/AddSubVenue";
import Venues from "./components/Panel/Venues";
import Cities from "./components/Panel/Cities";
import Images from "./components/Panel/Images";
import Cart from "./pages/Cart";
import PasswordReset from "./components/PasswordReset";
import History from "./components/Panel/History";
import AddCities from "./components/Panel/AddCities";
import CustomDatePicker from "./components/CustomDatePicker";
import { Navbar } from "./components";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import { setUserDetails } from "../src/features/user/userSlice.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Loader from "./components/Common/Loader.jsx";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("accessToken");
  useEffect(() => {
    const theme = localStorage.getItem("selectedTheme");
    if (theme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          }
        );
        const obj = response.data.data;
        dispatch(
          setUserDetails({
            _id: obj._id,
            email: obj.email,
            firstName: obj.firstName,
            lastName: obj.lastName,
            userType: obj.userType,
            contactNumber: obj.contactNumber,
          })
        );
      } catch (err) {
        console.error("error fetching user details!" + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  const showNavbar = ![
    "/",
    "/dateSelector",
    "/profile",
    "/panel/add-services",
    "/panel/my-services",
    "/panel/add-venue",
    "/panel/history",
    "/panel/venues",
    "/panel/add-city",
    "/auth/signin",
    "/auth/signup",
    "/auth/verify",
    "/auth/reset-password",
    "/cart",
  ].includes(location.pathname); // Paths where Navbar should be hidden

  return (
    <>
      {loading && <Loader />}
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
      {/* <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />

          {isAuthenticated() ? (
            <>
              <Route element={<Panel />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/panel/add-services" element={<AddServices />} />
                <Route path="/panel/my-services" element={<MyServices />} />
                <Route path="/panel/history" element={<History />} />
                <Route path="/panel/add-venue" element={<AddVenue />} />
                <Route path="/panel/venues" element={<Venues />} />
                <Route path="/panel/add-sub-venues" element={<AddSubVenue />} />
                <Route path="/panel/add-city" element={<AddCities />} />
                <Route path="/panel/cities" element={<Cities />} />
                <Route path="/panel/addImage" element={<Images />} />
              </Route>
            </>
          ) : (
            <></>
          )}
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/verify" element={<VerifyAccount />} />
          <Route path="/auth/reset-password" element={<PasswordReset />} />

          <Route path="/vendor/:vendorId" element={<Vendor />} />
          <Route path="/dateSelector" element={<CustomDatePicker />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div> */}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />

          {/* Public Routes */}
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/verify" element={<VerifyAccount />} />
          <Route path="/auth/reset-password" element={<PasswordReset />} />
          <Route path="/vendor/:vendorId" element={<Vendor />} />
          <Route path="/dateSelector" element={<CustomDatePicker />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/cart" element={<Cart />} />

          {/* Protected Routes */}
          <Route element={<Panel />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/add-services"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <AddServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/my-services"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <MyServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/add-venue"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddVenue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/venues"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Venues />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/add-sub-venues"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddSubVenue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/add-city"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddCities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/cities"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Cities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel/addImage"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <Images />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
