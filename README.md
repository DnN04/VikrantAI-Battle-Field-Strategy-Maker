# ⚔️ Battlefield Strategy AI

A turn-based tactical AI game demonstrating **Minimax algorithm with Alpha-Beta pruning** in a military command center aesthetic.

## 🎯 Project Status: Checkpoint 1

**✅ What's Complete:**
- Core AI engine (Minimax + Alpha-Beta)
- Enhanced heuristic with 7 tactical factors
- Terrain system (Plains, Forest, Hills, Water)
- Unit types (Infantry, Armor, Artillery)
- Line-of-sight mechanics
- Military themed styling foundation

**🔜 Coming in Checkpoint 2:**
- Full UI components
- Playable game interface
- AI vs AI / Human vs AI modes

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Tailwind CSS | 3.x | Styling |
| Lucide React | latest | Icons |

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server (will work after Checkpoint 2)
npm run dev

# Build for production
npm run build
```

---

## 🎮 Game Features

### Enhanced from PRD:
1. **3 Unit Types**
   - 🧑 Infantry: Short range, versatile
   - 🛡️ Armor: Medium range, high power
   - 💥 Artillery: Long range, fragile

2. **4 Terrain Types**
   - Plains: Neutral ground
   - Forest: Cover bonus, slows armor
   - Hills: High ground advantage
   - Water: Nearly impassable

3. **Tactical Mechanics**
   - Line-of-sight calculations
   - Terrain-based combat modifiers
   - Range-based engagement
   - Stamina management

4. **AI Features**
   - Minimax with Alpha-Beta pruning
   - Configurable search depth (1-6)
   - Pruning toggle for comparison
   - Real-time node count display

---

## 🏗️ Project Structure

```
src/
├── core/           # AI logic (complete)
├── game/           # Game logic (complete)
├── ui/             # Components (coming next)
├── hooks/          # React hooks (coming next)
└── lib/            # Utilities (complete)
```

See `PROJECT_STRUCTURE.md` for detailed breakdown.

---

Built with ❤️ for tactical AI demonstration
