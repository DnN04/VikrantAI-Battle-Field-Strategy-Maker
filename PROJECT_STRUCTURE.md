# 🎯 Battlefield Strategy AI - Project Structure Guide

## 📁 Complete Folder Structure

```
battlefield-ai/
│
├── 📂 public/                          # Static assets
│   └── vite.svg                        # Favicon (default)
│
├── 📂 src/
│   │
│   ├── 📂 core/                        # ✅ COMPLETE - Pure AI Logic (NO React)
│   │   ├── BattleState.ts              # ✅ State interfaces, terrain, LOS
│   │   ├── constants.ts                # ✅ Unit types, terrain, config
│   │   ├── actions.ts                  # ✅ ATTACK/DEFEND/RETREAT logic
│   │   ├── heuristic.ts                # ✅ Board evaluation (7 factors)
│   │   ├── minimax.ts                  # ✅ Minimax + Alpha-Beta
│   │   └── aiAgent.ts                  # ✅ High-level AI interface
│   │
│   ├── 📂 game/                        # ✅ COMPLETE - Game Logic
│   │   ├── gameLoop.ts                 # ✅ Turn processing
│   │   └── winConditions.ts            # ✅ Win/lose/draw checker
│   │
│   ├── 📂 ui/                          # 🔜 NEXT - React Components
│   │   ├── BattlefieldGrid.tsx         # 🔜 Canvas grid + units + terrain
│   │   ├── StatusPanel.tsx             # 🔜 HP, Stamina, Turn display
│   │   ├── DecisionPanel.tsx           # 🔜 AI decision info
│   │   ├── GameLog.tsx                 # 🔜 Scrollable turn history
│   │   ├── DepthSlider.tsx             # 🔜 Depth control (1-6)
│   │   ├── AlphaBetaToggle.tsx         # 🔜 Pruning ON/OFF
│   │   ├── ModeSelector.tsx            # 🔜 Human vs AI / AI vs AI
│   │   ├── ActionButtons.tsx           # 🔜 Attack/Defend/Retreat
│   │   ├── StatsBar.tsx                # 🔜 Nodes with/without pruning
│   │   └── UnitSelector.tsx            # 🔜 Choose unit type
│   │
│   ├── 📂 hooks/                       # 🔜 NEXT - Custom React Hooks
│   │   └── useGameEngine.ts            # 🔜 Main game state manager
│   │
│   ├── 📂 lib/                         # ✅ COMPLETE - Utilities
│   │   └── utils.ts                    # ✅ Tailwind class merger
│   │
│   ├── 📂 components/                  # 🔜 OPTIONAL - shadcn/ui components
│   │   └── ui/                         # 🔜 Button, Card, Slider, etc.
│   │
│   ├── App.tsx                         # 🔜 NEXT - Main layout
│   ├── main.tsx                        # ✅ React entry (default)
│   └── index.css                       # ✅ COMPLETE - Military theme CSS
│
├── 📄 index.html                       # ✅ HTML entry
├── 📄 package.json                     # ✅ Dependencies
├── 📄 tsconfig.json                    # ✅ TypeScript config
├── 📄 vite.config.ts                   # ✅ Vite config
├── 📄 tailwind.config.js               # ✅ COMPLETE - Military theme
├── 📄 postcss.config.js                # ✅ PostCSS config
└── 📄 README.md                        # 🔜 Documentation

```

---

## 🎨 What's Already Built (Checkpoint 1)

### ✅ **Core AI Engine** (`src/core/`)
All the brain of the game - complete and ready:
- **BattleState.ts**: Game state with terrain, units, LOS
- **constants.ts**: All game configuration
- **actions.ts**: Combat logic with terrain awareness
- **heuristic.ts**: Evaluates board (strength, terrain, position, etc.)
- **minimax.ts**: Full minimax + alpha-beta pruning
- **aiAgent.ts**: Clean interface for UI to call

### ✅ **Game Logic** (`src/game/`)
- **gameLoop.ts**: Turn processor
- **winConditions.ts**: Win/lose detection

### ✅ **Styling** 
- **index.css**: Military command center theme
- **tailwind.config.js**: Tactical color palette

---

## 🔜 What's Coming Next (Checkpoint 2)

### Phase 2: UI Components (`src/ui/`)
All the visual components with military aesthetic

### Phase 3: Game Engine Hook (`src/hooks/`)
The bridge between AI logic and React UI

### Phase 4: Main App (`App.tsx`)
Wire everything together

---

## 🚀 How to Use This Structure

### **Current State (After Checkpoint 1)**
```bash
npm install        # Install all dependencies
npm run dev        # Won't work yet - no UI components
```

### **After Checkpoint 2 (Next delivery)**
```bash
npm install
npm run dev        # ✅ Full playable game!
```

---

## 📦 Key Files to Review in Checkpoint 1

1. **`src/core/constants.ts`** - See all unit types & terrain
2. **`src/core/BattleState.ts`** - Main game state structure
3. **`src/core/heuristic.ts`** - How AI evaluates positions
4. **`src/core/minimax.ts`** - The algorithm itself
5. **`tailwind.config.js`** - Military color theme

---

## 🎯 File Naming Conventions

- **`.ts`** = Pure TypeScript (no JSX/React)
- **`.tsx`** = React components with JSX
- **`PascalCase.tsx`** = React components
- **`camelCase.ts`** = Utility functions/logic

---

## 🔥 Next Steps for You

1. **Extract the ZIP**
2. **Run `npm install`** (installs dependencies)
3. **Review the `src/core/` folder** - this is the AI brain
4. **Wait for Checkpoint 2** - will add UI and make it playable

---

## ⚠️ Important Notes

- **Don't modify `src/core/` manually** - I'll provide updates
- **The UI folders are empty for now** - coming in next checkpoint
- **This won't run yet** - need UI components first
- **All AI logic is done** - minimax, heuristic, actions complete

---

Built with ❤️ for tactical battlefield AI demonstration
PRD compliant with enhanced features (terrain, unit types, LOS)
