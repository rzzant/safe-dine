# SafeDine — Allergy-Aware Dining System

A full-stack app that lets diners select their allergies and view a color-coded menu (green = safe, red = unsafe) with a simulated QR code scanner flow.

---

## 📁 Folder Structure

```
allergy-dining/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (sessionId + allergies[])
│   │   └── MenuItem.js      # Menu item schema (name, allergens[], etc.)
│   ├── routes/
│   │   ├── userRoutes.js    # POST /user, GET /user/:sessionId
│   │   └── menuRoutes.js    # GET /menu, GET /menu/:id
│   ├── seed/
│   │   └── seed.js          # Seeds 22 menu items into MongoDB
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── AllergySelector.jsx  + .css
    │   │   └── MenuCard.jsx         + .css
    │   ├── pages/
    │   │   ├── AllergyPage.jsx      + .css   (Page 1)
    │   │   ├── MenuPage.jsx         + .css   (Page 2)
    │   │   └── QRLandingPage.jsx    + .css   (QR Simulator)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Prerequisites

- Node.js v18+ (https://nodejs.org)
- MongoDB running locally on port 27017 (https://www.mongodb.com/try/download/community)

### Start MongoDB (if not already running):
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

---

## 🚀 Setup & Run

### Step 1 — Set up the Backend

```bash
cd allergy-dining/backend

# Copy environment file
cp .env.example .env
# (Edit .env if your MongoDB runs on a different port/host)

# Install dependencies
npm install

# Seed the database with 22 sample menu items
npm run seed

# Start the backend server
npm run dev
```

Backend runs at: **http://localhost:5000**

---

### Step 2 — Set up the Frontend

Open a **new terminal** tab/window:

```bash
cd allergy-dining/frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

Frontend runs at: **http://localhost:3000**

---

## 🌐 Open the App

Visit **http://localhost:3000** in your browser.

### Pages:
| URL | Description |
|-----|-------------|
| `/` | Select your allergies (checkboxes) |
| `/menu` | View color-coded menu (green = safe, red = unsafe) |
| `/qr` | QR scanner simulator — click a restaurant to "scan" |

---

## 📋 .env Reference

```env
MONGO_URI=mongodb://localhost:27017/allergy_dining
PORT=5000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/user` | `{ sessionId, allergies[] }` | Save/update user allergies |
| `GET` | `/user/:sessionId` | — | Retrieve user allergies |
| `GET` | `/menu` | — | Return all menu items |
| `GET` | `/menu/:id` | — | Return single menu item |

---

## ✅ Features

- **Allergy selection**: Choose from nuts, dairy, gluten, shellfish, eggs, soy
- **Menu filtering**: Show all / safe only / unsafe only
- **Color coding**: Green border = safe, red border = unsafe
- **Category tabs**: Filter by starter, main, dessert, drink
- **QR simulator**: Click a fake restaurant, watch scan animation, open menu
- **Persistent allergies**: Saved in localStorage + MongoDB
- **Graceful degradation**: App works from localStorage even if backend is down

---

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite + React Router + plain CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
