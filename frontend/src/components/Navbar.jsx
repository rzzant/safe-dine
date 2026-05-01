import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          Safe<span>Dine</span>
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
          >
            🌿 My Allergies
          </Link>
          <Link
            to="/menu"
            className={`nav-btn ${location.pathname === "/menu" ? "active" : ""}`}
          >
            🍽️ Menu
          </Link>
          <Link
            to="/qr"
            className={`nav-btn ${location.pathname === "/qr" ? "active" : ""}`}
          >
            📱 QR Scan
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
