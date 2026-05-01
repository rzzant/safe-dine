# SafeDine — Allergy-Aware Dining System

## Overview

SafeDine is a full-stack web application that helps users identify safe food options based on their allergies. It provides a color-coded menu system and a simulated QR-based restaurant flow.

## Live Demo
https://safe-dine-lovat.vercel.app/

Demo Flow:
1. Select allergies
2. View menu (green = safe, red = unsafe)
3. Try QR simulation

## Problem

People with food allergies face difficulty in identifying safe meals when dining out, which can lead to serious health risks.

## Solution

SafeDine allows users to select their allergies and instantly view a filtered, color-coded menu:

* Green indicates safe items
* Red indicates unsafe items

## Features

* Allergy selection (nuts, dairy, gluten, shellfish, eggs, soy)
* Color-coded menu (safe vs unsafe)
* Menu filtering (all / safe / unsafe)
* Category-based browsing (starter, main, dessert, drink)
* QR scanner simulation for restaurant access
* Persistent user preferences using localStorage and database

## Tech Stack

* Frontend: React, Vite, React Router, CSS
* Backend: Node.js, Express
* Database: MongoDB, Mongoose





## Project Structure

```
allergy-dining/
├── backend/
├── frontend/
```

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/allergy_dining
PORT=5000
```

---

## API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /user            | Save user allergies |
| GET    | /user/:sessionId | Get user allergies  |
| GET    | /menu            | Get all menu items  |
| GET    | /menu/:id        | Get menu item       |

---

## Future Improvements

* Real QR scanning integration
* Restaurant onboarding system
* Enhanced UI and accessibility

