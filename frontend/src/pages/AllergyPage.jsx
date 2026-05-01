import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllergySelector from "../components/AllergySelector.jsx";
import "./AllergyPage.css";

// Generate or retrieve a session ID so we can persist allergies
function getSessionId() {
  let id = localStorage.getItem("dining_session_id");
  if (!id) {
    id = "session_" + Math.random().toString(36).slice(2, 11);
    localStorage.setItem("dining_session_id", id);
  }
  return id;
}

function AllergyPage() {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load saved allergies on mount
  useEffect(() => {
    const sessionId = getSessionId();
    const saved = localStorage.getItem("user_allergies");
    if (saved) {
      try {
        setSelectedAllergies(JSON.parse(saved));
      } catch {
        // ignore parse error
      }
    }
    // Try to fetch from backend too
    fetch(`/api/user/${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.allergies && data.allergies.length > 0) {
          setSelectedAllergies(data.allergies);
        }
      })
      .catch(() => {}); // silently fail if backend unavailable
  }, []);

  async function handleSave() {
    setLoading(true);
    setError(null);
    const sessionId = getSessionId();

    // Save to localStorage (works without backend)
    localStorage.setItem("user_allergies", JSON.stringify(selectedAllergies));

    // Try to save to backend
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, allergies: selectedAllergies }),
      });
      if (!res.ok) throw new Error("Server error");
    } catch {
      // Backend may be down — localStorage fallback is enough
    }

    setLoading(false);
    setSaved(true);
    setTimeout(() => {
      navigate("/menu");
    }, 800);
  }

  function handleClear() {
    setSelectedAllergies([]);
    setSaved(false);
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>
            Tell us about your <em>allergies</em>
          </h1>
          <p>We'll highlight what's safe for you on the menu.</p>
        </div>
      </div>

      <div className="container allergy-page-content fade-in">
        <div className="card">
          <div className="allergy-page-intro">
            <p>
              Select all allergens that apply to you. Items on the menu will be
              color-coded — <strong style={{ color: "var(--safe-green)" }}>green for safe</strong> and{" "}
              <strong style={{ color: "var(--unsafe-red)" }}>red for unsafe</strong>.
            </p>
          </div>

          <AllergySelector
            selected={selectedAllergies}
            onChange={setSelectedAllergies}
          />

          {selectedAllergies.length > 0 && (
            <div className="allergy-summary">
              <span className="allergy-summary__label">Your allergies:</span>
              <div className="allergy-summary__tags">
                {selectedAllergies.map((a) => (
                  <span key={a} className="badge badge-unsafe">
                    ⚠ {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedAllergies.length === 0 && (
            <div className="allergy-none-note">
              <span>🙌</span> No allergies selected — all menu items will be marked safe.
            </div>
          )}

          {error && (
            <div className="error-box">
              ⚠️ {error}
            </div>
          )}

          <div className="allergy-page-actions">
            <button className="btn-secondary" onClick={handleClear}>
              Clear All
            </button>
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={loading || saved}
            >
              {saved
                ? "✓ Saved! Redirecting…"
                : loading
                ? "Saving…"
                : "Save & View Menu →"}
            </button>
          </div>
        </div>

        <div className="qr-promo card">
          <div className="qr-promo__icon">📱</div>
          <div>
            <strong>At a restaurant?</strong> Use the QR scanner to instantly load the
            restaurant menu with your allergy preferences applied.
          </div>
          <a href="/qr" className="btn-secondary">
            Open QR Simulator
          </a>
        </div>
      </div>
    </div>
  );
}

export default AllergyPage;
