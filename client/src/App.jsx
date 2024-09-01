import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ThemeConverter from "./components/ThemeConvertor";
import Home from "./pages/Home";
import Caterer from "./components/Caterer";
import Decorator from "./components/Decorator";
import Photographer from "./components/Photographer";
import Registration from "./pages/Registration";
import Cookies from "js-cookie";
import VerifyAccount from "./components/VerifyAccount";
import Profile from "./pages/Profile";
import Payment from "./components/Payment";

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const isAuthenticated = () => {
    return !!Cookies.get("accessToken"); // Check if user is authenticated
  };

  return (
    <Router>
      <div>
        <ThemeConverter />
        <Routes>
          {isVisible ? (
            <Route
              path="/"
              element={<LandingPage setIsVisible={setIsVisible} />}
            />
          ) : (
            <Route path="/" element={<Home />} />
          )}

          {/* Redirect authenticated users away from auth routes */}
          {isAuthenticated() ? (
            <Route path="/" element={<Home />} />
          ) : (
            <>
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/verify" element={<VerifyAccount />} />
            </>
          )}

          <Route path="/profile" element={<Profile />} />
          <Route path="/caterer" element={<Caterer />} />
          <Route path="/decorator" element={<Decorator />} />
          <Route path="/photographer" element={<Photographer />} />

          <Route path="/registration" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
