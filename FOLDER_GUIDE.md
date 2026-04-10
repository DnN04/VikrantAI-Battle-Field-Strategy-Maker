# 📁 BATTLEFIELD AI - FOLDER STRUCTURE (Visual Guide)

## 🎯 This is What You'll Add Files To

```
battlefield-ai/                              ← ROOT FOLDER
│
├── 📂 public/                               ← Static assets (icons, images)
│   └── favicon.svg
│
├── 📂 src/                                  ← ALL SOURCE CODE HERE
│   │
│   ├── 📂 core/                             ✅ DONE - Pure AI Logic
│   │   ├── BattleState.ts                   ✅ Game state + terrain + units
│   │   ├── constants.ts                     ✅ Config (unit types, terrain)
│   │   ├── actions.ts                       ✅ ATTACK/DEFEND/RETREAT
│   │   ├── heuristic.ts                     ✅ Board evaluation (7 factors)
│   │   ├── minimax.ts                       ✅ Minimax + Alpha-Beta
│   │   └── aiAgent.ts                       ✅ AI decision interface
│   │
│   ├── 📂 game/                             ✅ DONE - Game Mechanics
│   │   ├── gameLoop.ts                      ✅ Turn processing
│   │   └── winConditions.ts                 ✅ Win/lose detection
│   │
│   ├── 📂 ui/                               🔜 NEXT - React Components
│   │   ├── BattlefieldGrid.tsx              🔜 Canvas with terrain + units
│   │   ├── StatusPanel.tsx                  🔜 HP/Stamina display
│   │   ├── DecisionPanel.tsx                🔜 AI decision info
│   │   ├── GameLog.tsx                      🔜 Turn history
│   │   ├── DepthSlider.tsx                  🔜 Search depth control
│   │   ├── AlphaBetaToggle.tsx              🔜 Pruning ON/OFF
│   │   ├── ModeSelector.tsx                 🔜 Human vs AI / AI vs AI
│   │   ├── ActionButtons.tsx                🔜 Attack/Defend/Retreat
│   │   ├── StatsBar.tsx                     🔜 Node count comparison
│   │   └── UnitSelector.tsx                 🔜 Choose unit type
│   │
│   ├── 📂 hooks/                            🔜 NEXT - Custom Hooks
│   │   └── useGameEngine.ts                 🔜 Main game state manager
│   │
│   ├── 📂 lib/                              ✅ DONE - Utilities
│   │   └── utils.ts                         ✅ Tailwind class merger
│   │
│   ├── 📂 components/                       🔜 OPTIONAL - shadcn/ui
│   │   └── ui/                              🔜 Button, Card, Slider, etc.
│   │
│   ├── App.tsx                              🔜 NEXT - Main app layout
│   ├── main.tsx                             ✅ Entry point (default Vite)
│   └── index.css                            ✅ DONE - Military theme CSS
│
├── 📄 index.html                            ✅ HTML entry
├── 📄 package.json                          ✅ Dependencies list
├── 📄 package-lock.json                     ✅ Locked versions
├── 📄 tsconfig.json                         ✅ TypeScript config
├── 📄 tsconfig.app.json                     ✅ App TypeScript config
├── 📄 tsconfig.node.json                    ✅ Node TypeScript config
├── 📄 vite.config.ts                        ✅ Vite configuration
├── 📄 tailwind.config.js                    ✅ DONE - Military colors
├── 📄 postcss.config.js                     ✅ PostCSS config
├── 📄 eslint.config.js                      ✅ Linting rules
│
├── 📄 README.md                             ✅ Project overview
├── 📄 PROJECT_STRUCTURE.md                  ✅ This guide (detailed)
├── 📄 SETUP_INSTRUCTIONS.md                 ✅ Setup steps
│
└── 📂 node_modules/                         🚫 DON'T TOUCH (auto-generated)

```

---

## 🎯 How to Add Files (For Next Checkpoints)

### When You Get Checkpoint 2 ZIP:

**Option A: Replace Everything** (Recommended)
```bash
# Just extract new ZIP and replace entire folder
unzip battlefield-ai-checkpoint2.zip
```

**Option B: Add Files Manually**
```bash
# New files will be in these folders:
src/ui/              # Copy all .tsx files here
src/hooks/           # Copy useGameEngine.ts here
src/components/ui/   # Copy shadcn components here
src/App.tsx          # Replace this file
```

---

## 🔍 Current State (Checkpoint 1)

### ✅ Folders with Files:
- `src/core/` - 6 files (complete AI logic)
- `src/game/` - 2 files (game mechanics)
- `src/lib/` - 1 file (utilities)

### 📂 Empty Folders (Ready for Next Phase):
- `src/ui/` - Will have 10+ React components
- `src/hooks/` - Will have 1 main hook
- `src/components/ui/` - Will have shadcn components

### 🎨 Config Files (All Set):
- `tailwind.config.js` - Military color theme
- `index.css` - Tactical styling
- `package.json` - All dependencies installed

---

## 📦 What's in Each Folder

### `src/core/` - The Brain 🧠
**Purpose:** Pure AI logic, no React, no UI
**What's inside:**
- Game state management
- Minimax algorithm
- Heuristic evaluation
- Action processing
- Constants/config

**Rule:** Never import React here!

---

### `src/game/` - Game Rules 🎮
**Purpose:** Game mechanics, turn processing
**What's inside:**
- Turn-by-turn processing
- Win/lose conditions
- Game state transitions

**Rule:** No UI logic, just game rules

---

### `src/ui/` - Visual Components 🎨
**Purpose:** All React components for display
**What's inside (coming soon):**
- Battlefield grid renderer
- Status displays
- Control panels
- Buttons and sliders

**Rule:** Only UI code, calls `core/` for logic

---

### `src/hooks/` - React Hooks 🪝
**Purpose:** Bridge between UI and core logic
**What's inside (coming soon):**
- `useGameEngine.ts` - Main game state hook

**Rule:** Manages React state, calls core logic

---

### `src/lib/` - Utilities 🔧
**Purpose:** Helper functions
**What's inside:**
- Class name merger for Tailwind

---

### `src/components/ui/` - UI Library 📦
**Purpose:** Reusable shadcn/ui components
**What's inside (coming soon):**
- Button, Card, Slider, Switch, etc.

---

## 🎓 File Naming Guide

### TypeScript Files (.ts)
- `camelCase.ts` - Utility functions
- `PascalCase.ts` - Classes/Interfaces

### React Components (.tsx)
- `PascalCase.tsx` - All React components
- Examples: `BattlefieldGrid.tsx`, `StatusPanel.tsx`

### Config Files
- `lowercase.config.js` - Configuration
- Examples: `vite.config.ts`, `tailwind.config.js`

---

## ⚠️ Important Rules

### DO:
✅ Keep this structure exactly as is
✅ Run `npm install` after extraction
✅ Add new files to designated folders

### DON'T:
❌ Move files between folders
❌ Rename core files
❌ Modify `node_modules/`
❌ Change folder structure

---

## 🚀 Quick Reference

| Folder | Status | Purpose |
|--------|--------|---------|
| `src/core/` | ✅ Complete | AI algorithms |
| `src/game/` | ✅ Complete | Game rules |
| `src/lib/` | ✅ Complete | Utilities |
| `src/ui/` | 📂 Empty | UI components (next) |
| `src/hooks/` | 📂 Empty | React hooks (next) |
| `src/components/ui/` | 📂 Empty | shadcn/ui (next) |

---

## 🎯 Next Checkpoint Preview

**Checkpoint 2 will add:**
- ~15 new files in `src/ui/`
- 1 file in `src/hooks/`
- ~8 files in `src/components/ui/`
- Updated `App.tsx`

**Total:** ~25 new files = Fully playable game!

---

Built for easy incremental updates
Each checkpoint adds files to existing structure
No manual merging needed - just extract and run!
