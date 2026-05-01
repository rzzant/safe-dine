import "./MenuCard.css";

function MenuCard({ item, userAllergies }) {
  const conflictingAllergens = item.allergens.filter((a) =>
    userAllergies.includes(a)
  );
  const isSafe = conflictingAllergens.length === 0;

  return (
    <div className={`menu-card ${isSafe ? "menu-card--safe" : "menu-card--unsafe"}`}>
      <div className="menu-card__top">
        <div className="menu-card__emoji">{item.emoji}</div>
        <div className="menu-card__status-badge">
          {isSafe ? (
            <span className="badge badge-safe">✓ Safe for you</span>
          ) : (
            <span className="badge badge-unsafe">⚠ Contains allergen</span>
          )}
        </div>
      </div>

      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__desc">{item.description}</p>

        {item.allergens.length > 0 && (
          <div className="menu-card__allergens">
            {item.allergens.map((a) => (
              <span
                key={a}
                className={`badge ${
                  userAllergies.includes(a) ? "badge-unsafe" : "badge-allergen"
                }`}
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {item.allergens.length === 0 && (
          <div className="menu-card__allergens">
            <span className="badge badge-safe">No allergens</span>
          </div>
        )}
      </div>

      <div className="menu-card__footer">
       <span className="menu-card__price">₹{item.price}</span>
        {!isSafe && (
          <span className="menu-card__warning">
            Contains: {conflictingAllergens.join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
