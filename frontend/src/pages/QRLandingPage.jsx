import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QRLandingPage.css";

const DEMO_RESTAURANTS = [
  { id: "trattoria", name: "La Trattoria", cuisine: "Italian", emoji: "🍝", table: "Table 7" },
  { id: "sakura",    name: "Sakura Garden", cuisine: "Japanese", emoji: "🍱", table: "Table 3" },
  { id: "spice",     name: "The Spice Route", cuisine: "Indian", emoji: "🍛", table: "Table 12" },
  { id: "burger",    name: "Burger Republic", cuisine: "American", emoji: "🍔", table: "Table 2" },
];

function QRLandingPage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(null);
  const navigate = useNavigate();

  function handleScan(restaurant) {
    setScanning(true);
    setScanned(null);
    setTimeout(() => {
      setScanning(false);
      setScanned(restaurant);
    }, 1500);
  }

  function handleOpenMenu() {
    navigate("/menu");
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>
            <em>QR</em> Menu Scanner
          </h1>
          <p>Simulate scanning a restaurant QR code to view their allergy-filtered menu.</p>
        </div>
      </div>

      <div className="container qr-page fade-in">

        {/* Explanation card */}
        <div className="card qr-explainer">
          <div className="qr-explainer__steps">
            <div className="qr-step">
              <div className="qr-step__num">1</div>
              <div className="qr-step__text">
                <strong>Set your allergies</strong> on the first page so we know what to filter.
              </div>
            </div>
            <div className="qr-step">
              <div className="qr-step__num">2</div>
              <div className="qr-step__text">
                <strong>Scan the QR code</strong> at the restaurant table (simulated below).
              </div>
            </div>
            <div className="qr-step">
              <div className="qr-step__num">3</div>
              <div className="qr-step__text">
                <strong>View the menu</strong> instantly filtered for your allergy profile.
              </div>
            </div>
          </div>
        </div>

        {/* QR Scanner simulation */}
        <div className="card qr-scanner-card">
          <h2 className="qr-scanner-card__title">Choose a restaurant to scan</h2>
          <p className="qr-scanner-card__sub">
            In a real setting, you'd point your phone camera at a QR code on the table.
            Click any restaurant below to simulate that experience.
          </p>

          <div className="restaurant-grid">
            {DEMO_RESTAURANTS.map((r) => (
              <button
                key={r.id}
                className={`restaurant-btn ${scanned?.id === r.id ? "restaurant-btn--active" : ""}`}
                onClick={() => handleScan(r)}
                disabled={scanning}
              >
                <span className="restaurant-btn__emoji">{r.emoji}</span>
                <span className="restaurant-btn__name">{r.name}</span>
                <span className="restaurant-btn__cuisine">{r.cuisine}</span>
                <span className="restaurant-btn__table">{r.table}</span>
              </button>
            ))}
          </div>

          {/* Scanning animation */}
          {scanning && (
            <div className="qr-scanning">
              <div className="qr-frame">
                <div className="qr-scan-line"></div>
                <div className="qr-corner qr-corner--tl"></div>
                <div className="qr-corner qr-corner--tr"></div>
                <div className="qr-corner qr-corner--bl"></div>
                <div className="qr-corner qr-corner--br"></div>
              </div>
              <p>Scanning QR code…</p>
            </div>
          )}

          {/* Scanned result */}
          {scanned && !scanning && (
            <div className="qr-result">
              <div className="qr-result__icon">✅</div>
              <div className="qr-result__info">
                <strong>{scanned.name}</strong> — {scanned.table}
                <br />
                <span>{scanned.cuisine} Cuisine</span>
              </div>
              <button className="btn-primary" onClick={handleOpenMenu}>
                Open Allergy-Filtered Menu →
              </button>
            </div>
          )}
        </div>

        {/* QR code visual (fake) */}
        <div className="card qr-code-display">
          <h3>Sample QR Code</h3>
          <p>This is what a table QR code looks like. Scanning it would open this menu system.</p>
          <div className="fake-qr">
            <svg viewBox="0 0 100 100" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
              {/* QR-like pattern */}
              <rect width="100" height="100" fill="white"/>
              {/* Top-left finder */}
              <rect x="5" y="5" width="28" height="28" fill="#1a1a18" rx="2"/>
              <rect x="9" y="9" width="20" height="20" fill="white" rx="1"/>
              <rect x="13" y="13" width="12" height="12" fill="#1a1a18" rx="1"/>
              {/* Top-right finder */}
              <rect x="67" y="5" width="28" height="28" fill="#1a1a18" rx="2"/>
              <rect x="71" y="9" width="20" height="20" fill="white" rx="1"/>
              <rect x="75" y="13" width="12" height="12" fill="#1a1a18" rx="1"/>
              {/* Bottom-left finder */}
              <rect x="5" y="67" width="28" height="28" fill="#1a1a18" rx="2"/>
              <rect x="9" y="71" width="20" height="20" fill="white" rx="1"/>
              <rect x="13" y="75" width="12" height="12" fill="#1a1a18" rx="1"/>
              {/* Data dots */}
              {[40,44,48,52,56,60].map((x, i) =>
                [40,44,48,52,56,60].map((y, j) =>
                  (i + j) % 3 !== 0 ? (
                    <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" fill="#1a1a18"/>
                  ) : null
                )
              )}
              {[40,44,48].map((x, i) =>
                [10,14,18,22,26].map((y, j) =>
                  (i + j) % 2 === 0 ? (
                    <rect key={`t-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#1a1a18"/>
                  ) : null
                )
              )}
              {[10,14,18,22,26].map((x, i) =>
                [40,44,48,52,56].map((y, j) =>
                  (i + j) % 2 === 0 ? (
                    <rect key={`l-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#1a1a18"/>
                  ) : null
                )
              )}
              {[67,71,75,79,83,87,91].map((x, i) =>
                [40,44,48,52,56].map((y, j) =>
                  (i * 3 + j) % 5 !== 2 ? (
                    <rect key={`r-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#1a1a18"/>
                  ) : null
                )
              )}
              {[40,44,48,52,56,60].map((x, i) =>
                [67,71,75,79,83,87,91].map((y, j) =>
                  (i + j * 2) % 4 !== 1 ? (
                    <rect key={`b-${x}-${y}`} x={x} y={y} width="3" height="3" fill="#1a1a18"/>
                  ) : null
                )
              )}
            </svg>
          </div>
          <p className="fake-qr-label">SafeDine — Allergy-Aware Menu</p>
        </div>
      </div>
    </div>
  );
}

export default QRLandingPage;
