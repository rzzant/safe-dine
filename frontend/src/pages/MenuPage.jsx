import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard.jsx";
import "./MenuPage.css";

const CATEGORIES = ["starter", "main", "dessert", "drink"];
const CATEGORY_LABELS = {
  starter: "🥗 Starters",
  main: "🍽️ Main Courses",
  dessert: "🍰 Desserts",
  drink: "🥤 Drinks",
};

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // "all" | "safe" | "unsafe"
  const [activeCategory, setActiveCategory] = useState("all");

  // Load user allergies from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user_allergies");
    if (saved) {
      try {
        setUserAllergies(JSON.parse(saved));
      } catch {
        setUserAllergies([]);
      }
    }
  }, []);

  // Fetch menu items from backend
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function isSafe(item) {
    return item.allergens.every((a) => !userAllergies.includes(a));
  }

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      activeCategory === "all" || item.category === activeCategory;
    const safeMatch =
      filter === "all" ||
      (filter === "safe" && isSafe(item)) ||
      (filter === "unsafe" && !isSafe(item));
    return categoryMatch && safeMatch;
  });

  const safeCount = menuItems.filter(isSafe).length;
  const unsafeCount = menuItems.length - safeCount;

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <span>Loading menu…</span>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>
            Today's <em>Menu</em>
          </h1>
          <p>Items are filtered based on your allergy profile.</p>
        </div>
      </div>

      <div className="container menu-page-content fade-in">
        {/* Stats Bar */}
        <div className="menu-stats">
          <div className="stat-card stat-card--safe">
            <span className="stat-card__count">{safeCount}</span>
            <span className="stat-card__label">Safe for you</span>
          </div>
          <div className="stat-card stat-card--unsafe">
            <span className="stat-card__count">{unsafeCount}</span>
            <span className="stat-card__label">Contains allergens</span>
          </div>
          {userAllergies.length > 0 && (
            <div className="stat-card stat-card--info">
              <span className="stat-card__label">Your allergies:</span>
              <div className="stat-card__badges">
                {userAllergies.map((a) => (
                  <span key={a} className="badge badge-unsafe">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
          {userAllergies.length === 0 && (
            <div className="stat-card stat-card--info">
              <span>🙌 No allergies set — all items are safe!</span>
              <Link to="/" className="btn-secondary" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                Set Allergies
              </Link>
            </div>
          )}
        </div>

        {error && (
          <div className="error-box">
            ⚠️ Could not connect to server. Make sure the backend is running.{" "}
            <a href="/menu" style={{ color: "inherit" }}>Retry</a>
          </div>
        )}

        {/* Filters */}
        <div className="menu-filters">
          <div className="filter-group">
            <span className="filter-label">Show:</span>
            <div className="filter-buttons">
              {["all", "safe", "unsafe"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "filter-btn--active" : ""} ${
                    f === "safe" ? "filter-btn--safe" : f === "unsafe" ? "filter-btn--unsafe" : ""
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All Items" : f === "safe" ? "✓ Safe Only" : "⚠ Unsafe Only"}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${activeCategory === "all" ? "filter-btn--active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <div style={{ fontSize: "2.5rem" }}>🔍</div>
            <p>No items match your filters.</p>
            <button className="btn-secondary" onClick={() => { setFilter("all"); setActiveCategory("all"); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          activeCategory === "all" ? (
            CATEGORIES.map((cat) => {
              const items = filteredItems.filter((item) => item.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat} className="menu-section">
                  <h2 className="menu-section__title">{CATEGORY_LABELS[cat]}</h2>
                  <div className="menu-grid">
                    {items.map((item) => (
                      <MenuCard key={item._id} item={item} userAllergies={userAllergies} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="menu-section">
              <h2 className="menu-section__title">{CATEGORY_LABELS[activeCategory]}</h2>
              <div className="menu-grid">
                {filteredItems.map((item) => (
                  <MenuCard key={item._id} item={item} userAllergies={userAllergies} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MenuPage;
