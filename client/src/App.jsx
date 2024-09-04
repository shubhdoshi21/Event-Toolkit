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
import Home from "./pages/Home";
import Caterer from "./components/Vendor";
import Registration from "./pages/Registration";
import Cookies from "js-cookie";
import VerifyAccount from "./components/VerifyAccount";
import Profile from "./pages/Profile";
import Panel from "./pages/Panel";
import AddServices from "./components/Panel/AddServices";
import MyServices from "./components/Panel/MyServices";
import Vendor from "./components/Vendor";
import Service from "./components/Panel/Service";
function App() {
  const [isVisible, setIsVisible] = useState(true);

  const isAuthenticated = () => {
    return !!Cookies.get("accessToken"); // Check if user is authenticated
  };

  return (
    <Router>
      <div>
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
<Route element={<Panel/>}>
<Route path="/profile" element={<Profile/>} /> 
{/* <Route path="service" element={<Service/>}/> */}
<Route path="/panel/add-services" element={<AddServices/>} /> 
<Route path="/panel/my-services" element={<MyServices/>} /> 
</Route>


          <Route path="/profile" element={<Profile />} />
          <Route path="/vendor/:vendorId" element={<Vendor />} />
         

          <Route path="/registration" element={<Registration />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
