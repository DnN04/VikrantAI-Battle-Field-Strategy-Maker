# ⚔️ Battlefield Strategy AI

A turn-based tactical AI game demonstrating **Minimax algorithm with Alpha-Beta pruning** in a military command center aesthetic.

![Version](https://img.shields.io/badge/version-1.0-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server  
npm run dev

# 3. Open browser to http://localhost:5173

# 4. Build for production
npm run build
```

**That's it! Game loads immediately. No configuration needed.**

---

## 🎮 Game Features

### 🤖 **AI Algorithm**
- Minimax with Alpha-Beta Pruning
- Configurable search depth (1-6)
- Toggle pruning to compare performance
- Real-time node evaluation metrics
- 60-80% efficiency with pruning enabled

### ⚔️ **3 Unit Types**
- 👤 **Infantry** - Balanced, forest bonus, range 1
- 🛡️ **Armor** - Heavy power, plains bonus, range 2  
- 💥 **Artillery** - Long range, hills bonus, range 4

### 🗺️ **4 Terrain Types**
- Plains, Forest, Hills, Water
- Affects attack/defense bonuses
- Visual terrain rendering
- Line-of-sight mechanics

### 🎯 **Tactical Features**
- Stamina management
- Range-based combat
- Terrain advantages
- Position evaluation

---

## 📊 Algorithm Performance

**Depth 4 with Pruning:**
- Nodes: ~500-2,000
- Time: 50-200ms
- 70% more efficient

**Depth 4 without Pruning:**
- Nodes: ~2,500-10,000  
- Time: 200-1000ms

---

## 🏗️ Project Structure

```
src/
├── core/      # AI logic (minimax, heuristic)
├── game/      # Game mechanics  
├── ui/        # React components
├── hooks/     # Game engine
└── App.tsx    # Main app
```

See `PROJECT_STRUCTURE.md` for details.

---

## 🎓 Educational Value

Demonstrates:
- Game tree search
- Alpha-Beta pruning
- Heuristic design
- TypeScript best practices
- React state management

---

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Netlify  
```bash
npm run build
# Upload 'dist' folder
```

Static build - no backend needed!

---

## 📝 Tech Stack

- React 18.3
- TypeScript 5.x
- Vite 5.x
- Tailwind CSS 3.4
- Lucide React

**Pure algorithm implementation - no external AI libraries!**

---

Built with ❤️ for AI education
