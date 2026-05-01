import "./AllergySelector.css";

const ALL_ALLERGENS = [
  { id: "nuts",     label: "Tree Nuts",  emoji: "🥜", description: "Almonds, cashews, walnuts, etc." },
  { id: "dairy",    label: "Dairy",      emoji: "🥛", description: "Milk, cheese, butter, cream" },
  { id: "gluten",   label: "Gluten",     emoji: "🌾", description: "Wheat, barley, rye, oats" },
  { id: "shellfish",label: "Shellfish",  emoji: "🦐", description: "Shrimp, crab, lobster, clams" },
  { id: "eggs",     label: "Eggs",       emoji: "🥚", description: "Eggs in any form" },
  { id: "soy",      label: "Soy",        emoji: "🫘", description: "Soy sauce, tofu, edamame" },
];

function AllergySelector({ selected, onChange }) {
  function toggle(id) {
    if (selected.includes(id)) {
      onChange(selected.filter((a) => a !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="allergy-grid">
      {ALL_ALLERGENS.map((allergen) => {
        const isSelected = selected.includes(allergen.id);
        return (
          <button
            key={allergen.id}
            className={`allergy-card ${isSelected ? "allergy-card--selected" : ""}`}
            onClick={() => toggle(allergen.id)}
            type="button"
            aria-pressed={isSelected}
          >
            <div className="allergy-card__check">
              {isSelected ? "✓" : ""}
            </div>
            <div className="allergy-card__emoji">{allergen.emoji}</div>
            <div className="allergy-card__label">{allergen.label}</div>
            <div className="allergy-card__desc">{allergen.description}</div>
          </button>
        );
      })}
    </div>
  );
}

export default AllergySelector;
