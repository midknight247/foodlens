# FoodLens 🌿 — AI-Powered Food Label Analysis

> **Understand your food. Make better choices.**  
> AI-powered food label analysis that turns confusing nutrition information into simple, personalized decisions.

Built for **Vibeathon 2026**.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

Visit the app in your browser at `http://localhost:5173`.

---

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (clean, accessible iconography)
- **Plus Jakarta Sans** (modern health-tech typography)

---

## 📂 Project Architecture

```
foodlens/
├── index.html                 # App shell with Plus Jakarta Sans typography
├── vite.config.js             # Vite config with React & Tailwind CSS plugin
├── package.json               # Dependencies and scripts
└── src/
    ├── main.jsx               # Application entry point
    ├── index.css              # Global styles with Tailwind CSS base layer
    ├── App.jsx                # Main controller with screen navigation state
    ├── data/
    │   └── mockData.js        # Analyses, demo labels, ingredient DB & profiles
    ├── utils/
    │   └── comparisonEngine.js# Dynamic product comparison & recommendation logic
    └── components/
        ├── Navbar.jsx         # Header with branding and quick links
        ├── HeroSection.jsx    # Core headline, CTAs, and live preview card
        ├── HowItWorks.jsx     # 3-step guide: Scan → Understand → Decide
        ├── RecentAnalyses.jsx # 2 sample food label breakdowns with scores
        ├── UploadPage.jsx     # Step 2: Drag-and-drop label upload, preview & demo
        ├── AnalysisPage.jsx   # Step 2: Health score, verdict, nutrients & breakdown
        ├── IngredientsPage.jsx# Step 3: Structured Ingredient Intelligence
        ├── PersonalizePage.jsx# Step 3: Profile customization (General, Child, Fitness, Low Sodium)
        ├── ComparisonPage.jsx # Step 4: Side-by-side product comparison & AI recommendation
        ├── PlaceholderPage.jsx# Interactive placeholder screens for other views
        └── Footer.jsx         # Clean health-tech footer with disclaimer
```

---

## ✨ Features Implemented

### Step 1: Foundation & Home Screen
1. **FoodLens Brand & Logo**: Polished brand identity with clean typography and green health-tech accents.
2. **Hero Section**:
   - Headline: *"Understand your food. Make better choices."*
   - Supporting text: *"AI-powered food label analysis that turns confusing nutrition information into simple, personalized decisions."*
   - Primary CTA: **"Scan Food Label"**
   - Secondary CTA: **"Enter Manually"**
   - Simulated label breakdown card showing live AI score (84/100).
3. **How FoodLens Works**:
   - 3 clear steps: **Scan**, **Understand**, and **Decide**.
4. **Recent Analyses (Local Mock Data)**:
   - *Artisan Almond Crunch Granola* (Score: 84 / 100 - "Great Choice")
   - *ChocoCreme Sandwich Cookies* (Score: 42 / 100 - "Eat in Moderation")

### Step 2: Food Label Upload & Analysis Screen
1. **Interactive Drag-and-Drop Upload Area**:
   - Real-time drag feedback, file pickers (PNG, JPG, WEBP), and local non-stretching image preview.
   - Demo options for Granola, Cookies, and Greek Yogurt with embedded SVG label graphics.
2. **AI Simulation Transition**:
   - Phased loading messages (*Reading label... Understanding ingredients... Building score...*).
3. **Analysis Screen (`AnalysisPage.jsx`)**:
   - 0–100 circular score gauge, verdict banner, macro metrics grid, positives, and watch-out items.

### Step 3: Ingredient Intelligence & Personalization Preview
1. **Ingredient Page Header (`IngredientsPage.jsx`)**:
   - Title: *"What's inside?"* with subtitle and selected product display.
2. **Ingredient Summary Card**:
   - Total ingredients count, functional additives identified, and items requiring attention.
   - Neutral, non-alarmist consumer health language.
3. **Smart Category Badging & Filtering**:
   - Visual badges for *Whole food*, *Sweetener*, *Emulsifier*, *Flavour enhancer*, *Acidity regulator*, etc.
4. **Expandable / Collapsible Ingredient Cards**:
   - Deep-dive chemical purpose and responsible FoodLens notes.
5. **Personalization Preview (`PersonalizePage.jsx`)**:
   - 4 selectable profiles: **General**, **Child**, **Fitness**, and **Low Sodium**.

### Step 4: Product Comparison Engine (`ComparisonPage.jsx`)
1. **Compare Entry Point**:
   - Natural secondary CTA on Analysis screen: *"Compare with another food →"*.
2. **Dynamic Comparison Engine (`comparisonEngine.js`)**:
   - Programmatically derives score differences, macro advantages, additive counts, and personal health insights.
3. **Side-by-Side Nutritional Breakdown**:
   - Highlights nutritional advantages across Calories, Protein, Carbs, Added Sugar, Total Fat, Sodium, and Fiber.
4. **AI-Style Final Recommendation Card**:
   - Generates an objective recommendation (*"Based on the information provided, FoodLens recommends..."*) with top 2–3 reasons.
5. **"It Depends on You" Profile Integration**:
   - Explains how recommendations change when evaluating for Fitness, Children, or Low Sodium.
6. **Product Swapping & Switching**:
   - Immediate reactive swap button between Product A and Product B.
   - Switch Product B among multiple available mock products.
