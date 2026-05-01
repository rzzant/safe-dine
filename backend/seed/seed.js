require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");

const menuItems = [
  // Starters
  {
    name: "Garden Salad",
    description: "Fresh mixed greens, cherry tomatoes, cucumber, and vinaigrette",
    category: "starter",
    price: 8.99,
    allergens: [],
    emoji: "🥗",
  },
  {
    name: "Garlic Bread",
    description: "Toasted sourdough with garlic butter and herbs",
    category: "starter",
    price: 6.99,
    allergens: ["gluten", "dairy"],
    emoji: "🍞",
  },
  {
    name: "Shrimp Cocktail",
    description: "Chilled shrimp with zesty cocktail sauce",
    category: "starter",
    price: 13.99,
    allergens: ["shellfish"],
    emoji: "🍤",
  },
  {
    name: "Bruschetta",
    description: "Toasted bread with tomatoes, basil, and olive oil",
    category: "starter",
    price: 9.99,
    allergens: ["gluten"],
    emoji: "🥖",
  },
  {
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and basil drizzled with olive oil",
    category: "starter",
    price: 11.99,
    allergens: ["dairy"],
    emoji: "🧀",
  },

  // Mains
  {
    name: "Grilled Chicken",
    description: "Free-range chicken breast with roasted vegetables and lemon herb sauce",
    category: "main",
    price: 18.99,
    allergens: [],
    emoji: "🍗",
  },
  {
    name: "Pasta Carbonara",
    description: "Classic Roman pasta with pancetta, egg, pecorino, and black pepper",
    category: "main",
    price: 16.99,
    allergens: ["gluten", "dairy", "eggs"],
    emoji: "🍝",
  },
 
  {
    name: "Grilled Salmon",
    description: "Atlantic salmon with asparagus, quinoa, and lemon butter",
    category: "main",
    price: 22.99,
    allergens: ["dairy"],
    emoji: "🐟",
  },
  {
    name: "Pad Thai",
    description: "Rice noodles with tofu, bean sprouts, peanuts, and tamarind sauce",
    category: "main",
    price: 15.99,
    allergens: ["nuts", "soy", "eggs"],
    emoji: "🍜",
  },
  {
    name: "Margherita Pizza",
    description: "Hand-tossed pizza with tomato sauce, mozzarella, and fresh basil",
    category: "main",
    price: 13.99,
    allergens: ["gluten", "dairy"],
    emoji: "🍕",
  },
  {
    name: "Grilled Veggie Bowl",
    description: "Seasonal grilled vegetables over brown rice with tahini drizzle",
    category: "main",
    price: 14.99,
    allergens: [],
    emoji: "🥦",
  },
  {
    name: "Lobster Bisque",
    description: "Creamy shellfish soup with fresh cream and cognac",
    category: "main",
    price: 24.99,
    allergens: ["shellfish", "dairy"],
    emoji: "🦞",
  },

  // Desserts
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    category: "dessert",
    price: 8.99,
    allergens: ["gluten", "dairy", "eggs"],
    emoji: "🍫",
  },
  {
    name: "Fruit Sorbet",
    description: "Three scoops of seasonal fruit sorbet — naturally dairy-free",
    category: "dessert",
    price: 6.99,
    allergens: [],
    emoji: "🍧",
  },
  {
    name: "Cheesecake",
    description: "New York-style cheesecake with berry compote on graham cracker crust",
    category: "dessert",
    price: 7.99,
    allergens: ["gluten", "dairy", "eggs"],
    emoji: "🍰",
  },
  {
    name: "Panna Cotta",
    description: "Silky Italian cream dessert with caramel sauce",
    category: "dessert",
    price: 7.49,
    allergens: ["dairy"],
    emoji: "🍮",
  },
  {
    name: "Almond Tart",
    description: "Buttery tart filled with frangipane and topped with sliced almonds",
    category: "dessert",
    price: 8.49,
    allergens: ["nuts", "gluten", "dairy", "eggs"],
    emoji: "🥧",
  },

  // Drinks
  {
    name: "Fresh Lemonade",
    description: "House-made lemonade with mint and a hint of ginger",
    category: "drink",
    price: 4.99,
    allergens: [],
    emoji: "🍋",
  },
  {
    name: "Oat Milk Latte",
    description: "Espresso with steamed oat milk — dairy-free option",
    category: "drink",
    price: 5.49,
    allergens: ["gluten"],
    emoji: "☕",
  },
  {
    name: "Mango Lassi",
    description: "Blended mango and yogurt smoothie with cardamom",
    category: "drink",
    price: 5.99,
    allergens: ["dairy"],
    emoji: "🥭",
  },
  {
    name: "Sparkling Water",
    description: "Still or sparkling mineral water",
    category: "drink",
    price: 2.99,
    allergens: [],
    emoji: "💧",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await MenuItem.deleteMany({});
    console.log("🗑️  Cleared existing menu items");

    await MenuItem.insertMany(menuItems);
    console.log(`🌱 Seeded ${menuItems.length} menu items`);

    await mongoose.disconnect();
    console.log("✅ Done! Disconnected from MongoDB.");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
