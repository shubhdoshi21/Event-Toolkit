import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Caterer from "./components/Caterer";
import Decorator from "./components/Decorator";
import Photographer from "./components/Photographer";

function App() {
  const [isVisible, setIsVisible] = useState(true);
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

          <Route path="/auth" element={<NotFound />} />
          <Route path="/registration" element={<NotFound />} />
          <Route path="/caterer" element={<Caterer />} />
          <Route path="/decorator" element={<Decorator />} />
          <Route path="/photographer" element={<Photographer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
