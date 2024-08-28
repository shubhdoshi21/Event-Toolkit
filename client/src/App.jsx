import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Router>
      <div>
        hello
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
          <Route path="/caterer" element={<NotFound />} />
          <Route path="/decorator" element={<NotFound />} />
          <Route path="/photographer" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
