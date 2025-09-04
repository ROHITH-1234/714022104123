import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ShortenerPage from "./Pages/ShortenerPage";
import StatsPage from "./Pages/StatsPage";
import RedirectPage from "./Pages/RedirectPage";
import logger from "./utils/logger";
import { useEffect } from "react";

// 🔹 Small wrapper to log route changes
function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    logger.info("Navigated to route", location.pathname);
  }, [location]);

  return null; // this component doesn't render anything
}

function App() {
  return (
    <Router>
      {/* Route logger always runs on navigation */}
      <RouteLogger />

      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
