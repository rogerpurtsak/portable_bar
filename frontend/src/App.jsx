import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Meist from "./pages/Meist";
import Galerii from "./pages/Galerii";
import Broneeri from "./pages/Broneeri";
import Profiil from "./pages/Profiil";

function App() {
  return (
    <Router>
      <div style={{minHeight: 100+"vh"}}>
      <Header />
      <Routes>
        {/* Siia saate lisada uusi alamlehti */}
        <Route path="/" element={<Home />} />
        <Route path="/meist" element={<Meist />} />
        <Route path="/galerii" element={<Galerii />} />
        <Route path="/broneeri" element={<Broneeri />} />
        <Route path="/profiil" element={<Profiil />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;