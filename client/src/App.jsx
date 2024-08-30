import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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



function App() {
  const [isVisible, setIsVisible] = useState(true);
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

          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signin" element={<Signin />} />
    
          <Route path="/caterer" element={<Caterer />} />
          <Route path="/decorator" element={<Decorator />} />
          <Route path="/photographer" element={<Photographer />} />

          <Route path="/registration" element={<Registration />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

