import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Meist from "./pages/Meist";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Siia saate lisada uusi alamlehti */}
        <Route path="/" element={<Home />} />
        <Route path="/meist" element={<Meist />} />
      </Routes>
    </Router>
  );
}

export default App;