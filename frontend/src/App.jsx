import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AllergyPage from "./pages/AllergyPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import QRLandingPage from "./pages/QRLandingPage.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllergyPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/qr" element={<QRLandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
